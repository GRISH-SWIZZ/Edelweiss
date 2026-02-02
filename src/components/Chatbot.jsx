import { ActionIcon, Box, Text } from '@mantine/core';
import { BotMessageSquare, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

function Chatbot() {
  const isChatOpen = useStore((state) => state.isChatOpen);
  const toggleChat = useStore((state) => state.toggleChat);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
        }}
      >
        <ActionIcon
          size={60}
          radius="xl"
          onClick={toggleChat}
          className="neon-glow"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          }}
        >
          {isChatOpen ? (
            <X size={28} color="white" />
          ) : (
            <BotMessageSquare size={28} color="white" />
          )}
        </ActionIcon>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '2rem',
              width: '400px',
              height: '500px',
              zIndex: 999,
            }}
          >
            <Box
              className="glassmorphic"
              style={{
                borderRadius: '16px',
                padding: '1.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BotMessageSquare size={64} color="#22d3ee" style={{ marginBottom: '1rem' }} />
              <Text size="xl" fw={600} c="white" ta="center">
                Chat Assistant
              </Text>
              <Text size="sm" c="dimmed" ta="center" mt="md">
                Coming Soon
              </Text>
              <Text size="xs" c="dimmed" ta="center" mt="xs">
                AI-powered chat assistance for stock intelligence
              </Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;
