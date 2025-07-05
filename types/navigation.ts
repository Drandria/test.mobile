export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppTabParamList = {
  List: { refresh?: boolean } | undefined;
  Detail: { id : string };
  Form: { id?: string };
  Profile: undefined;
}

export type TabParamList = {
  Produit: undefined;
  Add: undefined;
  Profile: undefined;
}