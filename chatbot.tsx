import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  text: string
  sender: 'user' | 'bot'
}

export default function AskLegalChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to Asklegal, your friendly AI assistant for work law information. How can I help?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      setInput('')
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: `I'm processing your question about "${input}". Please allow me a moment to provide you with accurate information based on current employment laws.`, 
          sender: 'bot' 
        }])
      }, 1000)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">Asklegal Chatbot</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              {message.sender === 'bot' && (
                <Avatar className="mr-2">
                  <AvatarImage src="https://replicate.delivery/pbxt/OMkAyAj0AKCCdWmDaNXpxA4oMXA4KQsmcnW4QK0ILBQleHOIA/out-0.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                {message.text}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full space-x-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type your question here..." 
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}
