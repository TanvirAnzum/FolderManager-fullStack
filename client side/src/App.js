import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootDirectory from "./components/RootDirectory";
import { Container } from "./components/styles/Container.styled";
import { Wrapper } from "./components/styles/Wrapper.styled";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Wrapper>
          <h1>Simple Folder Structure</h1>
          <RootDirectory />
        </Wrapper>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
