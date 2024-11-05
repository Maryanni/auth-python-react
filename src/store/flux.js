const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      accessToken: localStorage.getItem("jwt-token") || null,
    },
    actions: {
      handlerOnChange: (e) => {
        setStore({ [e.target.name]: e.target.value });
      },

      postUser: async () => {
        const { first_name, last_name, email, password } = getStore();
        const user = { first_name, last_name, email, password };
        console.log("Valor del user en el post", user);
        try {
          const response = await fetch("http://localhost:5051/user", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (!response.ok) {
            //throw new Error("Network response was not ok");
            return { success: false, message: data.msg };
          }
          console.log("User registered successfully:", data);
          return { success: true };
        } catch (error) {
          console.error("Error during fetch:", error);
          return { success: false, message: "Something went wrong. Please try again later." };

        }
      },

      loginUser: async () => {
        const { email, password } = getStore();
        const user = { email, password };
        console.log("Valor del user en el login", user);
        try {
          const response = await fetch("http://localhost:5051/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            console.log("Hola");
          }
          const data = await response.json();
          if (data.access_token) {
            localStorage.setItem("jwt-token", data.access_token);
            setStore({ accessToken: data.access_token });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }
      },
    },
  };
};

export default getState;
