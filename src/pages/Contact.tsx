import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface Reply {
  id: string;
  date: string;
  from: string;
  title: string;
  message: string;
  parentReplyId?: string;
  replies: Reply[];
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  replies: Reply[];
}

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    document.title = "StichUp | Contact";
    loadMessages();
  }, []);

  const loadMessages = () => {
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    setMessages(existingMessages.filter((msg: ContactMessage) => 
      msg.email === formData.email || localStorage.getItem('lastContactEmail') === msg.email
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMessage = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString(),
      replies: []
    };

    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    localStorage.setItem('contactMessages', JSON.stringify([newMessage, ...existingMessages]));
    localStorage.setItem('lastContactEmail', formData.email);

    setFormData({ name: '', email: '', message: '' });
    loadMessages();

    toast({
      title: "Success",
      description: "Your message has been sent successfully!",
    });
  };

  const handleReply = (message: ContactMessage) => {
    setSelectedMessage(message);
    setReplyDialogOpen(true);
  };

  const handleSendReply = () => {
    if (!selectedMessage) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      from: selectedMessage.name,
      title: 'Re: Previous Message',
      message: replyText,
      replies: []
    };

    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const updatedMessages = existingMessages.map((msg: ContactMessage) => {
      if (msg.id === selectedMessage.id) {
        return {
          ...msg,
          replies: [...msg.replies, newReply]
        };
      }
      return msg;
    });

    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    loadMessages();
    setReplyDialogOpen(false);
    setReplyText('');

    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully!"
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const renderReplies = (replies: Reply[]) => {
    return replies.map((reply) => (
      <div key={reply.id} className="ml-4 mt-2 p-4 bg-secondary/30 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium">{reply.title}</div>
            <div className="text-sm text-muted-foreground">From: {reply.from}</div>
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date(reply.date).toLocaleDateString()}
          </div>
        </div>
        <div className="mt-2 text-sm">{reply.message}</div>
        {reply.replies && reply.replies.length > 0 && renderReplies(reply.replies)}
      </div>
    ));
  };

  return (
    <div className="relative min-h-screen pt-[8.5rem] pb-16 px-6 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 grid-background"></div>
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-secondary/50 text-xs text-primary/80 rounded-full mb-2 animate-slide-in backdrop-blur-sm">
            GET IN TOUCH
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-2">
            Have a question or want to collaborate? Send us a message and we'll get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Enter your name" 
                    className="bg-background/60 border-secondary/50 focus:border-primary/30"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-background/60 border-secondary/50 focus:border-primary/30"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Type your message here" 
                    className="bg-background/60 border-secondary/50 focus:border-primary/30 min-h-[120px]"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Send Message
                </Button>
              </form>
            </div>

            {messages.length > 0 && (
              <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50">
                <h2 className="text-xl font-semibold mb-4">Your Messages</h2>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="border-b border-secondary/50 pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(message.date).toLocaleDateString()}
                          </p>
                          <p className="mt-1">{message.message}</p>
                        </div>
                        {message.replies && message.replies.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedMessage(message);
                              setHistoryDialogOpen(true);
                            }}
                          >
                            View Conversation
                          </Button>
                        )}
                      </div>
                      {message.replies && message.replies.length > 0 && (
                        <div className="mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReply(message)}
                          >
                            Reply
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Want To Visit Us?</h3>
                    <p className="text-sm text-muted-foreground">We do not currently have an office, but you can make an appointment with us in the contact form.</p>
                  </div>
                </div>
            
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-sm text-muted-foreground">+48 504 792 460</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-sm text-muted-foreground">contact@stichup.pl</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-2 border border-secondary/50 h-[300px] overflow-hidden">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-52.237049,21.017532&layer=mapnik"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ borderRadius: '0.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
                className="opacity-80 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>
        </div>

        <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Conversation History</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              {selectedMessage && (
                <div className="space-y-2">
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">
                      Original message from {selectedMessage.name} on {new Date(selectedMessage.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm">{selectedMessage.message}</div>
                  </div>
                  {selectedMessage.replies && renderReplies(selectedMessage.replies)}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reply to Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Your Reply</Label>
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                Send Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Contact;
