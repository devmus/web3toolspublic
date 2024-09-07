import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Stepn } from "./pages/Stepn";
import { Assetdash } from "./pages/Assetdash";
import { Auctions } from "./pages/Assetdash/Auctions";
import { SwapRewards } from "./pages/Assetdash/SwapRewards";
import { Compare } from "./pages/Stepn/Compare";
import { Logs } from "./pages/Stepn/Logs";

export const router = createBrowserRouter([
  {
    path: "/web3tools/",
    element: <Layout />,
    errorElement: <NotFound />,
    children:
    [
      {
        index: true,
        element: <Home />
      },
      {
        path: "assetdash",
        element: <Assetdash />,
        children:[
          {
            index: true,
            element: <div>Assetdash Home</div>
          },
          {
            path: "swaprewards",
            element: <SwapRewards/>
          },
          {
            path: "auctions",
            element: <Auctions/>
          }
        ]
      },
      {
        path: "stepn",
        element: <Stepn />,
        children:[
          {
            index: true,
            element: <div>StepN Home</div>
          },
          {
            path: "logs",
            element: <Logs/>
          },
          {
            path: "compare",
            element: <Compare/>
          }
        ]
      }
    ]
  },
]);