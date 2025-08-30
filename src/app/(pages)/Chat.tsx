'use client'
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  InputAdornment,
} from '@mui/material';
import {
  Send,
  AttachFile,
  EmojiEmotions,
  Search,
  MoreVert,
} from '@mui/icons-material';

interface Message {
  id: number;
  sender: 'user' | 'contact';
  content: string;
  timestamp: Date;
  avatar?: string;
  senderName?: string;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'A',
    lastMessage: 'Hey! How are you doing?',
    timestamp: '2 min ago',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: 'B',
    lastMessage: 'Thanks for the update!',
    timestamp: '15 min ago',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Carol Davis',
    avatar: 'C',
    lastMessage: 'Let\'s schedule a meeting',
    timestamp: '1 hour ago',
    unread: 1,
    online: false,
  },
  {
    id: 4,
    name: 'David Wilson',
    avatar: 'D',
    lastMessage: 'Perfect! See you tomorrow',
    timestamp: '3 hours ago',
    unread: 0,
    online: false,
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'contact',
    content: 'Hey there! How are you doing today?',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    senderName: 'Alice Johnson',
  },
  {
    id: 2,
    sender: 'user',
    content: 'Hi Alice! I\'m doing great, thanks for asking. How about you?',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: 3,
    sender: 'contact',
    content: 'I\'m good too! Working on some exciting projects. Would love to catch up soon.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    senderName: 'Alice Johnson',
  },
  {
    id: 4,
    sender: 'user',
    content: 'That sounds awesome! Let me know when you\'re free.',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
];

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState<Contact>(mockContacts[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'user',
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate response
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          sender: 'contact',
          content: 'Thanks for your message! I\'ll get back to you soon.',
          timestamp: new Date(),
          senderName: selectedContact.name,
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="space-y-8">
      {/* Header */}
      <Box className="glass-card p-6" sx={{ background: 'var(--gradient-glass)', backdropFilter: 'blur(20px)' }}>
        <Typography variant="h4" className="font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-black mb-2">
          Chat & Messages 💬
        </Typography>
        <Typography variant="body1" className="text-muted-foreground">
          Stay connected with your team and clients.
        </Typography>
      </Box>

      {/* Chat Interface */}
      <Box className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 h-[500px] sm:h-[600px]">
        {/* Contacts Sidebar */}
        <Paper 
          elevation={0}
          className="glass-card overflow-hidden xl:col-span-1"
          sx={{
            background: 'var(--gradient-glass)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Box className="p-3 sm:p-4 border-b border-glass-border/30">
            <Typography variant="h6" className="font-semibold text-foreground mb-3 sm:mb-4 text-base sm:text-lg">
              Contacts
            </Typography>
            <TextField
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="filled"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-muted-foreground text-sm" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: 'hsl(var(--input))',
                  borderRadius: '12px',
                  fontSize: '14px',
                },
              }}
            />
          </Box>
          
          <List className="p-0 overflow-y-auto max-h-[350px] sm:max-h-[450px]">
            {filteredContacts.map((contact) => (
              <ListItem
                key={contact.id}
                component="div"
                onClick={() => setSelectedContact(contact)}
                className={`cursor-pointer transition-smooth hover:bg-muted/50 ${
                  selectedContact.id === contact.id ? 'bg-primary/20' : ''
                } px-2 sm:px-4`}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: contact.online ? 'hsl(var(--success))' : 'hsl(var(--muted))',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                      }
                    }}
                  >
                    <Avatar className="gradient-primary glow-primary w-10 h-10 sm:w-12 sm:h-12">
                      {contact.avatar}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <span className="flex items-center justify-between">
                      <Typography variant="body2" className="font-medium text-foreground text-sm truncate">
                        {contact.name}
                      </Typography>
                      <Typography variant="caption" className="text-muted-foreground text-xs">
                        {contact.timestamp}
                      </Typography>
                    </span>
                  }
                  secondary={
                    <span className="flex items-center justify-between">
                      <Typography 
                        variant="caption" 
                        className="text-muted-foreground truncate text-xs"
                        style={{ maxWidth: '120px' }}
                      >
                        {contact.lastMessage}
                      </Typography>
                      {contact.unread > 0 && (
                        <Badge 
                          badgeContent={contact.unread} 
                          className="text-primary-foreground"
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: 'hsl(var(--primary))',
                              fontSize: '9px',
                              height: 16,
                              minWidth: 16,
                            }
                          }}
                        />
                      )}
                    </span>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Chat Area */}
        <Paper 
          elevation={0}
          className="xl:col-span-2 glass-card flex flex-col overflow-hidden"
          sx={{
            background: 'var(--gradient-glass)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Chat Header */}
          <Box className="p-3 sm:p-4 border-b border-glass-border/30 flex items-center justify-between">
            <Box className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: selectedContact.online ? 'hsl(var(--success))' : 'hsl(var(--muted))',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                  }
                }}
              >
                <Avatar className="gradient-primary glow-primary w-10 h-10 sm:w-12 sm:h-12">
                  {selectedContact.avatar}
                </Avatar>
              </Badge>
              <Box className="min-w-0">
                <Typography variant="h6" className="font-semibold text-foreground text-sm sm:text-base truncate">
                  {selectedContact.name}
                </Typography>
                <Typography variant="caption" className="text-muted-foreground text-xs">
                  {selectedContact.online ? 'Online' : 'Last seen ' + selectedContact.timestamp}
                </Typography>
              </Box>
            </Box>
            <IconButton className="text-muted-foreground hover:text-foreground" size="small">
              <MoreVert />
            </IconButton>
          </Box>

          {/* Messages Area */}
          <Box className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <Box
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <Box
                  className={`max-w-[280px] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-2xl transition-smooth ${
                    message.sender === 'user'
                      ? 'gradient-primary text-primary-foreground glow-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Typography variant="body2" className="mb-1 text-sm">
                    {message.content}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    className={`block text-xs ${
                      message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </Typography>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Message Input */}
          <Box className="p-3 sm:p-4 border-t border-glass-border/30">
            <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
              <TextField
                fullWidth
                multiline
                maxRows={3}
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                variant="filled"
                size="small"
                sx={{
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'hsl(var(--input))',
                    borderRadius: '16px',
                    paddingRight: '12px',
                    fontSize: '14px',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className="mb-1">
                      <Box className="flex items-center space-x-1">
                        <IconButton size="small" className="text-muted-foreground hover:text-foreground">
                          <AttachFile fontSize="small" />
                        </IconButton>
                        <IconButton size="small" className="text-muted-foreground hover:text-foreground">
                          <EmojiEmotions fontSize="small" />
                        </IconButton>
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton
                type="submit"
                className="gradient-primary glow-primary transition-smooth hover:glow-accent"
                sx={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  width: 40,
                  height: 40,
                  '&:hover': {
                    background: 'var(--gradient-primary)',
                  },
                }}
                size="small"
              >
                <Send fontSize="small" />
              </IconButton>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Chat;