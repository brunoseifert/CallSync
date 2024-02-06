"use client";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SocketContext } from "@/contexts/SocketContext";
import { useContext, useEffect, useRef } from "react";

export default function Room({ params }: { params: { id: string } }) {
  const { socket } = useContext(SocketContext);
  const localStream = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    socket?.on("connect", async () => {
      console.log("conectado");
      socket?.emit("subscribe", {
        roomId: params.id,
        socketId: socket.id,
      });
      await initCamera();
    });
  }, [socket]);

  const initCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
    console.log("🚀 ~ initCamera ~ video:", video);
    if (localStream.current) localStream.current.srcObject = video;
  };
  return (
    <div className="max-h-screen">
      <Header />
      <div className="flex h-[80%] ">
        <div className="md:w-[80%] max-w-6xl w-full mx-auto m-3 ">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <div className="bg-gray-950 w-full rounded-md  p-2 relative ">
              <video
                className="bg-cover w-auto h-full rounded-md"
                autoPlay
                ref={localStream}
              ></video>
              <span className="absolute bottom-3">Bruno Seifert</span>
            </div>
            <div className="bg-gray-950 w-full rounded-md h-full p-2 relative ">
              <video className="h-full w-full"></video>
              <span className="absolute bottom-3">Alexia Kattah</span>
            </div>
            <div className="bg-gray-950 w-full rounded-md h-full p-2 relative ">
              <video className="h-full w-full"></video>
              <span className="absolute bottom-3">Alexia Kattah</span>
            </div>
            <div className="bg-gray-950 w-full rounded-md h-full p-2 relative ">
              <video className="h-full w-full"></video>
              <span className="absolute bottom-3">Alexia Kattah</span>
            </div>
          </div>
        </div>
        <Chat roomId={params.id} />
      </div>
      <Footer />
    </div>
  );
}
