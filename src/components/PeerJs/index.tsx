import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import './style.css';
import { Routes, Route } from 'react-router-dom';
import Peer, { MediaConnection } from 'peerjs';
import { io } from 'socket.io-client';

export default function PeerJsComponent() {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const uuidRef = useRef<HTMLDivElement | null>(null);
    const liveRef = useRef<HTMLDivElement | null>(null);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

    const [RtcUUID, setRtcUUID] = useState<string>('');
    const [streamID, setStreamID] = useState<string>('');
    const [userNickname, setUserNickname] = useState<string>('');
    const [userProfileImageUrl, setUserProfileImageUrl] = useState<string>('');
    const [userGrade, setUserGrade] = useState<string>('');

    const [peerId, setPeerId] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);

    const peer = new Peer();
    let currentCall: MediaConnection | undefined;

    async function getMediaStream() {
        let stream: MediaStream | undefined;

        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
        } catch (error) {
            console.warn('Failed to get video stream:', error);
        }

        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            if (stream) {
                audioStream.getAudioTracks().forEach((track) => {
                    if (stream) {
                        stream.addTrack(track);
                    }
                });
            } else {
                stream = audioStream;
            }
        } catch (error) {
            console.warn('Failed to get audio stream:', error); 
        }

        if (!stream) {
            stream = new MediaStream();
        }

        return stream;
    }

    async function callUser() {
        const stream = await getMediaStream();
        // switch to the video call and play the camera preview
        if (!menuRef.current) return;
        menuRef.current.style.display = 'none';
        if (!liveRef.current) return;
        liveRef.current.style.display = 'block';
        if (!localVideoRef.current) return;
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play().catch((error) => {});
        // make the call
        const call = peer.call(peerId, stream);
        call.on('stream', (stream) => {
            if (!remoteVideoRef.current) return;
            remoteVideoRef.current.srcObject = stream;
            remoteVideoRef.current.play().catch((error) => {});
        });
        // call.on("data", (stream) => {
        //   if (!remoteVideoRef.current) return;
        //   remoteVideoRef.current.srcObject = stream;
        // });
        call.on('error', (err) => {
            console.log(err);
        });
        call.on('close', () => {
            endCall();
        });
        // save the close function
        currentCall = call;
    }

    peer.on('call', (call) => {
        if (window.confirm(`Accept call from ${call.peer}?`)) {
            // grab the camera and mic
            getMediaStream()
                .then((stream) => {
                    // play the local preview
                    if (!localVideoRef.current) return;
                    if (stream.getVideoTracks().length > 0) {
                        // 비디오 트랙이 있을 경우에만 비디오를 재생
                        localVideoRef.current.srcObject = stream;
                        localVideoRef.current.play();
                    }
                    // answer the call
                    // call.answer(stream);
                    // save the close function
                    currentCall = call;
                    // change to the video view
                    if (!menuRef.current) return;
                    menuRef.current.style.display = 'none';
                    if (!liveRef.current) return;
                    liveRef.current.style.display = 'block';
                    call.on('stream', (remoteStream) => {
                        // when we receive the remote stream, play it
                        if (!remoteVideoRef.current) return;
                        if (remoteStream.getVideoTracks().length > 0) {
                            // 비디오 트랙이 있을 경우에만 비디오를 재생
                            remoteVideoRef.current.srcObject = remoteStream;
                            remoteVideoRef.current.play();
                        }
                        setRemoteStreams((prevStreams) => [...prevStreams, remoteStream]);
                    });
                })
                .catch((err) => {
                    console.log('Failed to get local stream:', err);
                });
        } else {
            // user rejected the call, close it
            call.close();
        }
    });

    function endCall() {
        // Go back to the menu
        if (!menuRef.current) return;
        menuRef.current.style.display = 'block';
        if (!liveRef.current) return;
        liveRef.current.style.display = 'none';
        // If there is no current call, return
        if (!currentCall) return;
        // Close the call, and reset the function
        try {
            currentCall.close();
        } catch {}
        currentCall = undefined;
    }

    const onPeerIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPeerId(value);
    };

    useEffect(() => {
        peer.on('open', function (id) {
            setId(id);
            socket.emit('join', { roomId: 'room1', peerId: id }); // 사용자의 ID를 서버에 전송
            callUser();
        });

        const socket = io("http://localhost:4020");

        socket.on('connect', () => {
        console.log('서버와 연결되었습니다.');
        socket.emit('join', 'room1');
        socket.on('receivce', (message) => {
            console.log('서버로부터 메시지를 받았습니다: ', message);
            });
        });

        const userInfo = {
            RtcUUID,
            streamID,
            userNickname,
            userProfileImageUrl,
            userGrade
        };

        socket.emit('send', userInfo);

        socket.on('disconnect', () => {
        console.log('서버와의 연결이 끊겼습니다.');
        });

        // 컴포넌트 unmount 시 소켓 연결 해제
        return () => {
        socket.disconnect();
        };
    }, [peerId, RtcUUID, streamID, userNickname, userProfileImageUrl, userGrade]);

    const onRtcUUIDChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setRtcUUID(value);
    }
    const onStreamIDChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setStreamID(value);
    }
    const onUserNickcnameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setUserNickname(value);
    }
    const onUserProfileImageUrlChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setUserProfileImageUrl(value);
    }
    const onUserGradeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setUserGrade(value);
    }

    return (
        <>
            <div id='menu' ref={menuRef}>
                {/* <p>Your ID:</p>
                <p id="uuid">{id}</p>  
                <input value={peerId} onChange={onPeerIdChangeHandler} type="text" placeholder="Peer id" />
                <button onClick={callUser}>Connect</button> */}
            </div>
            <div id='live' ref={liveRef}>
                {remoteStreams.map((stream, index) => (
                    <video key={index} ref={video => { if (video) video.srcObject = stream; }} muted playsInline autoPlay></video>
                ))}
                <video ref={localVideoRef} id='local-video' muted playsInline></video>
                <button id='end-call' onClick={endCall}>
                    End Call
                </button>
            </div>
        </>
    );
}
