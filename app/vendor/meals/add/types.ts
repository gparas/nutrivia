import { Tables } from "@/types/supabase";

export type InitData = Omit<Tables<'foods'>, 'id' | 'created_at' | 'image_orientation' >;

export type Props = {
    onClickNext: (data: {}) => void;
    onClickBack: () => void;
    initData: InitData
  }
