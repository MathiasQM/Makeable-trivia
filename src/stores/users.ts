import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase.js";

export const useUserStore = defineStore("users", () => {

  type User = {
    email: string;
    id: string;
  };

  const user = ref<User | null>(null);
  const errorMessage = ref("");
  const loading = ref<boolean>(false);

  // Validate if input is a valid email
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Validate credentials before logging in
  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    const { email, password } = credentials;

    if (!validateEmail(email)) {
      loading.value = false;
      return (errorMessage.value = "This is an invalid Email!");
    }

    if (!password.length) {
      loading.value = false;
      return (errorMessage.value = "You have to provide a password");
    }
    // If validation checks pass start loader
    loading.value = true;

    // Sign in on supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
// if an error accurs show it to the user
    if (error) {
      loading.value = false;
      return (errorMessage.value = error.message + "!");
    }
    const { data: existingUser } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .single();

    user.value = {
      email: existingUser.email,
      id: existingUser.id,
    };

    loading.value = false;
    errorMessage.value = "";
  };

  // handle logout & clear token
  const handleLogout = async () => {
    await supabase.auth.signOut();
    user.value = null;
  };

  // Get Auth token 
  const getUser = async () => {
    loading.value = true;
    const { data, error } = await supabase.auth.getUser();

    if (!data.user || error) {
      loading.value = false;
    }
    const { data: userWithEmail } = await supabase
      .from("users")
      .select()
      .eq("email", data.user.email)
      .single();

    user.value = {
      email: userWithEmail.email,
      id: userWithEmail.id,
    };

    loading.value = false;
  };

  const clearErrorMessage = () => {
    errorMessage.value = "";
  };

  return {
    loading,
    user,
    errorMessage,
    getUser,
    handleLogin,
    handleLogout,
    clearErrorMessage,
  };
});
