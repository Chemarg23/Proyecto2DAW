package com.app.application.services;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.app.application.ports.repositories.ChatRepository;
import com.app.application.ports.repositories.UserRepository;
import com.app.domain.entity.Message;
import com.app.domain.entity.User;
import com.app.dto.message.MessageDTO;
import com.app.dto.user.GetUserDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl extends TextWebSocketHandler {

    private final Map<Integer, Set<WebSocketSession>> roomSessions = new ConcurrentHashMap<>();
    private final ObjectMapper mapper = new ObjectMapper();
    private final ModelMapper modelMapper = new ModelMapper();
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        int roomId = extractRoomId(session);
        roomSessions.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        int roomId = extractRoomId(session);
        Set<WebSocketSession> sessions = roomSessions.get(roomId);
        if (sessions != null) {
            sessions.remove(session);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        Message newMessage = mapper.readValue(message.getPayload(), Message.class);
        int roomId = newMessage.getRoom();

        Set<WebSocketSession> sessions = roomSessions.get(roomId);
        if (sessions != null) {
            Message finalMessage = chatRepository.save(newMessage);
            MessageDTO finalMessageDTO = modelMapper.map(finalMessage, MessageDTO.class);
            User user = userRepository.findById(finalMessageDTO.getUser().getId()).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));
            GetUserDTO dto = new GetUserDTO();
            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setImgPath(user.getImgPath());
            finalMessageDTO.setUser(dto);
            TextMessage textMessage = new TextMessage(mapper.writeValueAsString(finalMessageDTO));
            for (WebSocketSession webSocketSession : sessions) {
                webSocketSession.sendMessage(textMessage);
            }
            
        }
    }

    private int extractRoomId(WebSocketSession session) {
        String uriString = session.getUri().toString();
        UriComponents uriComponents = UriComponentsBuilder.fromUriString(uriString).build();
        return Integer.parseInt(uriComponents.getPathSegments().get(1));
    }

}
