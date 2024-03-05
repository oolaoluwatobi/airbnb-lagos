import axios from "axios";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineHeart } from "react-icons/ai";

import { User } from "@prisma/client";

import useLoginModal from "./useLoginModal";

interface IUserFavorite {
  listingId: string;
  currentUser?: User | null | undefined;
}

const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    if (!currentUser) {
      return false;
    }

    const list = currentUser.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        if (hasFavorited) {
          await axios.delete(`/api/favorites/${listingId}`, {
            data: currentUser,
          });
          toast.success("removed from favorites");
        } else {
          const req = await axios.post(`/api/favorites/${listingId}`, {
            data: currentUser,
          });
          console.log(req, "REQ______useFAVORITEtsx49");
          toast.success("added to favorites");
        }

        router.refresh();
      } catch (error) {
        toast.error("failed");
      }

      router.refresh();
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
