import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

const RewardsLayout = lazy(() => import("./components/layout"));
const RewardsPage = lazy(() => import("./components/overview/page"));
const MyRewardsPage = lazy(() => import("./components/my-rewards/page"));
const PointsHistoryPage = lazy(
  () => import("./components/points-history/page"),
);
const RedeemShopPage = lazy(() => import("./components/redeem-shop/page"));
const GlobalLeaderboardPage = lazy(
  () => import("./components/global-leaderboard/page"),
);
const AddRewardPage = lazy(() => import("./components/add-reward/page"));

export const rewardsRoutes: RouteObject[] = [
  {
    path: PATHS.REWARDS.ROOT,
    element: <RewardsLayout />,
    children: [
      {
        index: true,
        element: <RewardsPage />,
      },
      {
        path: PATHS.REWARDS.MY_REWARDS,
        element: <MyRewardsPage />,
      },
      {
        path: PATHS.REWARDS.POINTS_HISTORY,
        element: <PointsHistoryPage />,
      },
      {
        path: PATHS.REWARDS.REDEEM_SHOP,
        element: <RedeemShopPage />,
      },
      {
        path: PATHS.REWARDS.GLOBAL_LEADERBOARD,
        element: <GlobalLeaderboardPage />,
      },
      {
        path: PATHS.REWARDS.ADD_REWARD,
        element: <AddRewardPage />,
      },
    ],
  },
];
