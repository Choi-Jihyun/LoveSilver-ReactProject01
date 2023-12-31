
import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase"; // firebase.js 파일 연동 

const AuthContext = createContext();

export function AuthContextProvider({ children }) {

  const [user, setUser] = useState(); // 사용자 로그인 상태관리 
  // const [loading, setLoading] = useState(true);

  useEffect(() => { // firebase.js 파일내에서 로그인/로그아웃 상태 관리 함수 실행 
    onUserStateChange((user) => (setUser(user)))
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>; // 로딩 중일 때 로딩 메시지를 보여줌
  // }

  return (
    <AuthContext.Provider  // 로그인/로그아웃 환경을 제공하는 Provider 설정 
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
