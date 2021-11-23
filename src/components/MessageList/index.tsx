import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { api } from "../../services/api";
import { io } from 'socket.io-client';

import { MESSAGES_EXAMPLE } from "../../utils/messages";

import { Message, MessageProps } from "../Message";

import { styles } from "./styles";

// Variavel em memória para gerenciar a fila
let messagesQueue: MessageProps[] = MESSAGES_EXAMPLE;

// Busca a URL base
const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
  console.log(newMessage);
})

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3');
      setCurrentMessages(messagesResponse.data);
    }

    fetchMessages();
  }, []);

  //Cria um timer para rodar de tempos em tempos
  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        // Pega e apresenta as mensagens na tela
        setCurrentMessages(prevState => [messagesQueue[0], prevState[0], prevState[1]]);
        messagesQueue.shift(); //Tira o primeiro elemento da fila
      }
    }, 3000) // intervalo de 3 segundos

    // Limpa o timer da memoria
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never" // Fecha o teclado ao clicar na scrollview
    >
      {currentMessages.map((message) => <Message key={message.id} data={message} />)}
    </ScrollView>
  );
}