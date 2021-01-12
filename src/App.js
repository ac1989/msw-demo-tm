import { QueryClient, QueryClientProvider } from "react-query";
import { Movies } from "./Movies";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Movies />
    </QueryClientProvider>
  );
}

export default App;
