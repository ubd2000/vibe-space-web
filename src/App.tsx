import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AvatarDetail from "./pages/AvatarDetail";
import Login from "./pages/Login";
import CreatorProfile from "./pages/CreatorProfile";
import BecomeCreator from "./pages/BecomeCreator";
import Signup from "./pages/Signup";
import Marketplace from "./pages/Marketplace";
import Creators from "./pages/Creators";
import PortfolioDetail from "./pages/PortfolioDetail";
import Community from "./pages/Community";
import WritePost from "./pages/WritePost";
import PostDetail from "./pages/PostDetail";
import ShoppingCart from "./pages/ShoppingCart";
import NotFound from "./pages/NotFound";

import BuyerLayout from "./components/layout/BuyerLayout";
import DashboardHome from "./pages/buyer/DashboardHome";
import OrderHistory from "./pages/buyer/OrderHistory";
import Wishlist from "./pages/buyer/Wishlist";
import FollowingList from "./pages/buyer/FollowingList";
import AccountSettings from "./pages/buyer/AccountSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/avatar/:id" element={<AvatarDetail />} />
          <Route path="/creator/:id" element={<CreatorProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/become-creator" element={<BecomeCreator />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/write" element={<WritePost />} />
          <Route path="/community/post/:id" element={<PostDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />


          // ... existing code ...

          {/* Buyer Routes */}
          <Route path="/buyer" element={<BuyerLayout />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="following" element={<FollowingList />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
