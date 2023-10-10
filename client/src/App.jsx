import React, { Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { checkUser } from "./components/action/checkUser";
import { UidContext } from "./components/Context/AppContext";
import router from "./components/Routes/index";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

function App() {
  const [uid, setUid] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const responses = await checkUser();
      setUid(responses);
    };
    fetchData();
  }, []);

  return (
    <UidContext.Provider value={uid}>
      <Provider store={store}>
        <Suspense fallback={<div>loading...</div>}>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </Provider>
    </UidContext.Provider>
  );
}

export default App;
