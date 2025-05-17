import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { About, HomeLayout, Landing, Error, NewsLetter, CockTail, SinglePageError } from "./pages";

import { loader as landing } from "./pages/Landing";
import {loader as singleCocktailLoader} from "./pages/CockTail";
import { action as newsletterAction } from "./pages/NewsLetter";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 1000 * 60 * 5
    }
  }
})


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children:[
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landing(queryClient)
      },
      {
        path: 'cocktail/:id',
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <CockTail />
      },
      {
        path: '/newsletter',
        action: newsletterAction,
        element: <NewsLetter />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  },
 
])

const App = () => {
  return(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} /> 
      <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
  </QueryClientProvider> 
  )
};
export default App;
