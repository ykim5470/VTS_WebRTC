// Use strict mode; x = 3.14 is not allowed. All variables must be declared.
"use strict"

// Libraries and Packages for server 
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const https = require('httpolyglot')
const mediasoup = require('mediasoup')
const path = require('path')
const ngrok = require('ngrok')
const fs = require('fs')
const nunjucks = require('nunjucks')
const Room = require('./room')
const Peer = require('./peer')
const ServerApi = require('./serverApi')
const Logger = require('./logger')
const log = new Logger('Server')
const config = require('./config')


const app = express()

// SSL for HTTPS set up 
const options = {
    key: fs.readFileSync(path.join(__dirname, config.sslKey), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname, config.sslCert), 'utf-8')
}

// Basic server initiation 
const httpsServer = https.createServer(options, app)
const io = require('socket.io')(httpsServer)
const host = `https://localhost:${config.listenPort}` // config.listenIp 
const announcedIp = config.mediasoup.webRtcTransport.listenIps[0].announcedIp

// All mediasoup workers
let workers = new Array
let nextMediasoupWorkerIdx = 0

// All Room lists
let roomList = new Map()



app.set('view engine', 'html')
nunjucks.configure(path.join(__dirname, '../../', 'public/views'), {
    express: app, 
    watch: true
})


app.use(cors())
app.use(compression())
app.use(express.static(path.join(__dirname, '../../', 'public')))
app.use(express.json());


// Remove trailing slashes in url handle bad requests
app.use((err, req,res, next)=>{
    if( err instanceof SyntaxError && err.status ===400 && 'body' in err){
        log.debug('Request Error', {
            header: req.headers,
            body: req.body,
            error: err.message
        })
        return res.status(400).send({status404, message: err.message}) // Bad request
    }
    // i.e. domain.com/page/일 경우에는 trailing slash가 존재하므로 에러
    if( req.path.substr(-1) === '/' && req.path.length > 1){
        let query = req.url.slice(req.path.lenght)
        // 301 error는 새로운 url이 제공되어야 함을 의미. 기존에 url 경로가 잘못됨.
        res.redirect(301, req.path.slice(0,-1) + query)
    }else{
        next()
    }
})

// ####################################################
// Routes 
// ####################################################


/*==================가이드 방 개설 페이지==================*/
// Guide landing page
app.get(['/g/landing'], (req,res)=>{
    res.render(path.join(__dirname, "../../", "public/views/guide/landing.html"))
})


/*==================사용자 방 접속 페이지==================*/
// User landing page
app.get(['/u/landing'], (req,res)=>{
    res.render(path.join(__dirname, "../../", 'public/views/user/landing.html'))
})


/*==================오디오 비디오 허용 불가 시==================*/
// If not allow video/audio
app.get(['/permission'], (req,res)=>{
    res.render(path.join(__dirname, '../../', 'public/views/common/permission.html'))
})


/*==================방 입장==================*/
app.get('/join/*', (req,res)=>{
    if(Object.keys(req.query).length > 0){
        log.debug(`redirect: ${req.url} to ${url.parse(req.url).pathname}`)
        res.redirect(url.parse(req.url).pathname)
    }
    else{
        res.sendFile(path.join(__dirname, '../../', 'public/views/common/room.html'))
    }
})

// ####################################################
// API
// ####################################################

// Request meeting room endpoint 
// 해당 API는 Meeting에 참석할 수 있는 지 아닌지 권한 확인하는 api
app.post(['/api/v1/meeting'], (req,res)=>{
    // Check if user was authorized for the api call
    let host = req.headers.host
    let authorization = req.headers.authorization
    let api = new ServerApi(host, authorization)
    if(!api.isAuthorized()){
        log.debug('User get meeting - Unauthorized', {
            header: req.headers,
            body: req.body
        })
        return res.status(403).json({error: 'Unauthorized!'})
    }
// Setup meeting URL
let meetingURL = api.getMeetingURL()
res.setHeader('Conetent-Type', 'application/json')
res.end(JSON.stringify({meeting: meetingURL}))
// log.debug the output if all done
log.debug('User get meeting - Authorized', {
    header: req.headers,
    body: req.body,
    meeting: meetingURL
    })
})

// Not match any of page before, so 404 not found
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, "../../", 'public/views/common/404.html'))
})


// ####################################################
// NGROK
// ####################################################

// NGROK은 외부에서 로컬 컴퓨터에 접속할 수 있게 만들어 주는 모듈;https://americanopeople.tistory.com/348
const ngrokStart = async() => {
    try {
        await ngrok.authtoken(config.ngrokAuthToken);
        await ngrok.connect(config.listenPort);
        let api = ngrok.getApi();
        let data = await api.listTunnels();
        let pu0 = data.tunnels[0].public_url;
        let pu1 = data.tunnels[1].public_url;
        let tunnel = pu0.startsWith('https') ? pu0 : pu1;
        log.debug('Listening on', {
            announced_ip: announcedIP,
            server: host,
            tunnel: tunnel,
            api_docs: api_docs,
            mediasoup_version: mediasoup.version,
        });
    } catch (err) {
        log.error('Ngrok Start error: ', err);
        process.exit(1);
    }
}


// ####################################################
// START SERVER
// ####################################################
httpsServer.listen(config.listenPort,()=>{
    log.debug(
        `%c
	███████╗██╗ ██████╗ ███╗   ██╗      ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
	██╔════╝██║██╔════╝ ████╗  ██║      ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
	███████╗██║██║  ███╗██╔██╗ ██║█████╗███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
	╚════██║██║██║   ██║██║╚██╗██║╚════╝╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
	███████║██║╚██████╔╝██║ ╚████║      ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
	╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝      ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝ started...
	`,
        'font-family:monospace',
    );
    if(config.ngrokAuthToken !== ''){
        ngrokStart()
        return
    }
    log.debug('Listening on', {
        announced_ip : announcedIp,
        server: host,
        mediasoupVersion: mediasoup.version
    })
})


// ####################################################
// WORKERS
// ####################################################


// Application 실행 시 WORKER 생성 함수 call
async () => {
    await createWorkers();
};


const createWorkers = async() =>{
    // CPU의 갯수 = WOKRER를 만들 수 있는 갯수
    let {numWorkers} = config.mediasoup

    log.debug(`WORKERS: ${numWorkers}}`)

    // CPU의 갯수 만큼 WORKER를 생성
    for (let i = 0; i < numWorkers; i++){
        // mediasoup.createWorker arguments 확인
        let worker = await mediasoup.createWorker({
            logLevel: config.mediasoup.worker.logLevel,
            logTags: config.mediasoup.worker.logTags,
            rtcMinPort: config.mediasoup.worker.rtcMinPort,
            rtcMaxPort: config.mediasoup.worker.rtcMaxPort
        })
        worker.on('died', ()=>{
            // This implies something serious happened, so kill the application
            log.error('Mediasoup worker has died, exiting in 2 seconds... [pid:%d]', worker.pid)
            setTimeout(()=> process.exit(1), 2000) // exit in 2 seconds
        })
        workers.push(worker)
    }
}

// worker 갯수 확인
const getMediasoupWorker = async( ) =>{
    const worker = workers[nextMediasoupWorkerIdx];
    if( ++nextMediasoupWorkerIdx === workers.length) nextMediasoupWorkerIdx=0
    return worker
}


// ####################################################
// SOCKET IO
// ####################################################

// mediasoup에서는 signaling을 제공하지 않기 때문에, socket을 사용하여 server와 client를 연결할 예정
io.on('connection', socket =>{

    // 방 생성 
    socket.on('createRoom', async({roomId}, callback)=>{
        socket.roomId = roomId

    if(roomList.has(socket.roomId)){
        callback('already exists')
    }else{
        log.debug('Created room', {roomId: socket.roomId})
        let worker = await getMediasoupWorker()
        // Room에 따라 router, transport 등 mediasoup webRTC를 고유하게 생성해서 관리할 수 있다. 
        roomList.set(socket.roomId, new Room(socket.roomId, worker, io))
        callback(socket.roomId)
    }
    })

    
    // 방 잠금 기능; 각 방 마다 "setLocked", "braodCast" function이 있다.
    socket.on('roomAction', (data)=>{
        log.debug(`Room action: ${data}`)
        switch(data.action){
            case 'lock':
                roomList.get(socket.roomId).setLocked(true, data.password)
                roomList.get(socket.roomId).broadCast(socket.id, 'roomAction', data.action)
                break
            case 'checkPassword':
                let roomData= {
                    room: null,
                    password: 'KO'
                }
                if( data.password == roomList.get(socket.roomId).getPassword()){
                    roomData.room = roomList.get(socket.roomId).toJson()
                    roomData.password = 'OK'
                    roomList.get(socket.roomId).sendTo(socket.id, 'roomPassword', roomData)
                }else{
                    roomList.get(socket.roomId).sendTo(socket.id, 'roomPassword', roomData)
                }
                break
            case ' unlock':
                roomList.get(socket.roomId).setLocked(false)
                roomList.get(socket.roomId).broadCast(socket.id, 'roomAction', data.action)
                break
        }
        log.debug(`Room locked:`, roomList.get(socket.roomId).isLocked())
    })

    // peer Action
    socket.on('peerAction', (data) =>{
        log.debug('Peer action:', data)
        if(data.broadcast){
            roomList.get(socket.roomId).broadCast(data.peerId, 'peerAction', data)
        }else{
            roomList.get(socket.roomId).sendTo(data.peerId, 'peerAction', data)
        }
    })

    // join
    socket.on('join', (data, cb)=>{
        if( !roomList.hs(socket.roomId)){
            return cb({
                error: 'Room does not exist'
            })
        }
        log.debug('User joined', data)
        roomList.get(socket.roomId).addPeer(new Peer(socket.id, data))

        // 방이 잠겨있을 경우
        if(roomList.get(socket.roomId).isLocked()){
            log.debug('User rejected because room is locked')
            cb('isLocked')
            return
        }
        cb(roomList.get(socket.roomId).toJson())
    })

    // RouterRtpCapablities get 
    socket.on('getRouterRtpCapabilties', (_,callback)=>{
        log.debug('Get RouterRtpCapabilities', getPeerName())
        try{
            callback(roomList.get(socket.roomId).getRtpCapabilities())
        }catch(error){
            callback({
                error: error.message
            })
        }
    })

    // Producer get function; 참여자 중 producer의 정보를 받는다.
    socket.on('getProducers', ()=>{
        if (!roomList.has(socket.roomId))return
        log.debug('Get producers', getPeerName())

        // send all the current producer to newly joined member
        // 이 기능은 가이드 스트리머만 행할 수 있어야 할 것으로 보인다.
        let producerList = roomList.get(socket.roomId).getProducerListForPeer()
        
        // producerList에는 현재 서비스에서는 guide들 밖에 없지 않을까 싶다. 
        socket.emit('newProducers', producerList)
    })

    // webRtcTransport를 생성
    socket.on('createWebRtcTransport', async(_, callback)=>{
        log.debug('Create webrtc transport', getPeerName())
        try{
            const {params} = await roomList.get(socket.roomId).createWebRtcTransport(socket.id)
            callback(params)

       }catch(error){
           log.error('Create WebRtc Transport error: ', error)
           callback({
               error: error.message
           })
       }

    })

    // connectTransport
    socket.on('connectTransport', async({transportId, dtlsParameters}, callback)=>{
        if(!roomList.has(socket.roomId))return
        log.debug('Connect transport', getPeerName())

        await roomList.get(socket.roomId).connectPeerTransport(socket.id, transportId, dtlsParameters)
        callback('success')
    })

    // produce
    socket.on('produce', async({kind, rtpParameters, producerTransportId}, callback)=>{
        if(!roomList.has(socket.roomId)){
            return callback({error: 'Room not found'})
        }
        let peerName = getPeerName(false)

        let producerId = await roomList.get(socket.roomID).produce(socket.id, producerTransportId, rtpParameters, kind)

        log.debug('Produce', {
            kind: kind,
            peerName: peerName,
            producerId: producerId
        })

        // peer info audio or video on
        let data = {
            peerName: peerName,
            type: kind,
            status: true,
        }
        roomList.get(scoket.roomId).getPeers().get(socket.id).updatePeerInfo(data)

        callback({
            producerId
        })
    })
    
        // consume
        socket.on('consume', async({consumerTransportId, producerId, getRtpCapabilities}, callback)=>{
            if(!roomList.has(socket.roomId)){
                return callback({error: 'Room not found'})
            }

            let params = await roomList.get(socket.roomId).consume(socket.id, consumerTransportId, producerId, getRtpCapabilities)

            log.debug('Consuming', {
                peerName : getPeerName(false),
                producerId : producerId,
                consumerId: params.id
            })
            callback(params)
        })

        // producer closed
        socket.on('producerClosed', (data) =>{
            log.debug('Producer close', data)

            // peer info audio or video off
            roomList.get(socket.roomId).getPeers().get(socket.id).updatePeerInfo(data)
            roomList.get(socket.roomId).closeProducer(socket.id, data.producerId)
        })

        // resume; Mediasoup에서는 항상 처음 자동 영상 시청은 false이므로 resume를 해야한다.
        socket.on('resume', async(_,callback)=>{
            await consumer.resume()
            callback()
        })

        // 방 정보 get
        socket.on('getRoomInfo', (_,cb)=>{
            log.debug('Send Room Info')
            cb(roomList.get(socket.roomId).toJson())
        })

        // 방에 참여중인 인원 업데이트
        socket.on('refreshParticipantsCount', ()=>{
            let data ={
                roomId : socket.roomId,
                peerCounts : roomList.get(Socket.roomId).getPeers().size
            }
            log.debug('Refresh Participants count', data)
            roomList.get(socket.roomId).broadCast(socket.id, 'refreshParticipantsCount', data)
        })

        // 채팅; 전부에게 혹은 특정 인원에게
        socket.on('message', (data) =>{
            log.debug('message', data)
            if(data.toPeerId == 'all'){
                roomList.get(socket.roomId).broadCast(socket.id, 'message',data)

            }else{
                roomList.get(scoket.roomId).sendTo(data.toPeerId, 'message',data)
            }
        })

        //  여기서 가이드가 disconnect을 했을 경우, 무언가를 더 추가해야 할 것 같다.
        socket.on('disconnect', ()=>{
            if(!socket.roomId)return
            log.debug('Disconnect', getPeerName())

            roomList.get(socket.roomId).removePeer(socket.id)

            if(roomList.get(socket.roomId).getPeers().size ===0 && roomList.get(socket.room_id).isLocked()){
                roomList.get(socket.roomId).setLocked(false)
            }

            roomList.get(socket.roomId).broadCast(socket.id, 'removeMe', removeMeData())
        })

        // exit room
        socket.on('exitRoom', async(_, callback)=>{
            if(!roomList.has(socket.roomId)){
                callback({
                    error: 'Not currently in a room'
                })
                return
            }
            log.debug('Exit room', getPeerName())

            // close transports
            await roomList.get(socket.roomId).removePeer(socket.id)

            roomList.get(socket.roomId).broadCast(socket.id, 'removeMe', removeMeData())

            if(roomList.get(socket.roomId).getPeers().size === 0){
                roomList.delete(socket.roomId)
            }
    
            socket.roomId = null
            callback('Successfully exited room')
        })


        /*==============Common==============*/
        const getPeerName = (json =true)=>{
            if(json){
                return{
                    peerName:
                    roomList.get(socket.roomId) && 
                    roomList.get(socket.roomId).getPeers().get(socket.id).peerInfo.peerName
                }
            }
            return(roomList.get(socket.roomId) && roomList.get(socket.roomId).getPeers().get(socket.id).peerInfo.peerName)
        }

        const removeMeData =()=>{
            return {
                roomId: roomList.get(socket.roomId) && socket.roomId,
                peerId: socket.id,
                peerCounts: roomList.get(socket.roomId) && roomList.get(socket.roomId).getPeers().size
            }
        }
})



