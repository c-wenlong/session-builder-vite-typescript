import { useState } from 'react'
import axios from 'axios'  // Add this import
import './App.css'
import { Button, Container, Text, VStack, Textarea, Spinner } from '@chakra-ui/react'

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
  const chatWithClaude = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setIsLoading(true);

    // Update the URL to match your backend server address and port
    axios.post(`http://localhost:3000/api/claude`, { prompt })
      .then((res) => {
        const data = res.data as { response: string };
        setResponse(data.response);
      })
      .catch((error) => {
        console.error('Error:', error);
        setResponse('An error occurred while fetching the response.');
      })

    setIsLoading(false);
  };
   */

  const chatWithGPT = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setIsLoading(true);

    // Update the URL to match your backend server address and port
    axios.post(`http://localhost:3000/api/gpt`, { prompt })
      .then((res) => {
        if (typeof res.data === 'string') {
          setResponse(res.data);
        } else {
          console.error('Unexpected response type:', typeof res.data);
          setResponse('Received an unexpected response from the server.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setResponse('An error occurred while fetching the response.');
      })

    setIsLoading(false);
  };

  return (
    <>
      <Container>
        <VStack spacing={4}>
          <Text fontSize="2xl">Chat with Claude</Text>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here"
            size='lg'
          />
          <Button colorScheme='blue' onClick={chatWithGPT} isLoading={isLoading}>
            Chat with Claude
          </Button>
          {response ? (
            <VStack align="start" width="100%">
              <Text fontWeight="bold">Response:</Text>
              <Text>{response}</Text>
            </VStack>
          ) :
            (isLoading ? (
              <Spinner size="xl" />
            ) : <Text>Please Enter Prompt...</Text>
            )}
        </VStack>
      </Container>
    </>
  )
}

export default App