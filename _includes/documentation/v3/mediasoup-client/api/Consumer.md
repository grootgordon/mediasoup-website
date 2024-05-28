## Consumer
{: #Consumer}

<section markdown="1">

A consumer represents an audio or video remote source being transmitted from the mediasoup router to the client application through a WebRTC transport.

</section>


### Dictionaries
{: #Consumer-dictionaries}

<section markdown="1">

#### ConsumerOptions
{: #ConsumerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`id`            | String  | The identifier of the server side consumer. | Yes |
`producerId`    | String  | The identifier of the server side producer being consumed. | Yes |
`kind`          | [MediaKind](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#MediaKind) | Media kind ("audio" or "video"). | Yes |
`rtpParameters` | [RtpReceiveParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpReceiveParameters) | Receive RTP parameters. | Yes |
`streamId`      | String  | Stream id. Useful to limit the inbound RTP streams that the underlying RTC stack should try to synchonize when rendering them. | No | The RTCP CNAME of the remote producer.
`appData`       | Object  | Custom application data. | No | `{ }`

</div>

<div markdown="1" class="note">
About `streamId`:

libwebrtc based devices can just synchonize up to one inbound audio stream and one inbound video stream. If `streamId` is not given, it will have the same value for all consumers belonging to the same producer. However, the application may wish to ensure that inbound microphone and camera streams produced by a remote peer are synchonized (instead of synchronizing, for instance, microphone and screen sharing streams). 

Usage example:

```typescript
micConsumer = await transport.consume({ streamId: `${remotePeerId}-mic-webcam` });
webcamConsumer = await transport.consume({ streamId: `${remotePeerId}-mic-webcam` });
screensharingConsumer = await transport.consume({ streamId: `${remotePeerId}-screensharing` });
```

</div>

</section>


### Properties
{: #Consumer-properties}

<section markdown="1">

#### consumer.id
{: #consumer-id .code}

Consumer identifier.

> `@type` String, read only

#### consumer.producerId
{: #consumer-producerId .code}

The associated producer identifier.

> `@type` String, read only

#### consumer.closed
{: #consumer-closed .code}

Whether the consumer is closed.

> `@type` Boolean, read only

#### consumer.kind
{: #consumer-kind .code}

The media kind ("audio" or "video").

> `@type` [MediaKind](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#MediaKind), read only

#### consumer.rtpReceiver
{: #consumer-rtpReceiver .code}

The associated WebRTC [RTCRtpReceiver](https://www.w3.org/TR/webrtc/#rtcrtpreceiver-interface) for this consumer. It may be `undefined` for non modern WebRTC implementations.

> `@type` [RTCRtpReceiver](https://www.w3.org/TR/webrtc/#rtcrtpreceiver-interface)\|Undefined, read only

<div markdown="1" class="note">
By getting access to the `RTCRtpReceiver` the application can directly modify its parameters or members. Use it with caution.
</div>

#### consumer.track
{: #consumer-track .code}

The remote audio or video track.

> `@type` [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack), read only

#### consumer.rtpParameters
{: #consumer-rtpParameters .code}

Consumer RTP parameters.

> `@type` [RtpReceiveParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpReceiveParameters), read only

<div markdown="1" class="note">
Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>

#### consumer.paused
{: #consumer-paused .code}

Whether the consumer is paused.

> `@type` Boolean, read only

#### consumer.appData
{: #consumer-appData .code}

Custom data Object provided by the application in the consumer factory method. The app can modify its content at any time.

> `@type` Object

#### consumer.observer
{: #consumer-observer .code}

See the [Observer Events](#Consumer-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Methods
{: #Consumer-methods}

<section markdown="1">

#### consumer.close()
{: #consumer-close .code}

Closes the consumer.

<div markdown="1" class="note">
This method should be called when the server side consumer has been closed (and vice-versa).
</div>

#### consumer.getStats()
{: #consumer-getStats .code}

Gets the local RTP receiver statistics by calling `getStats()` in the underlying `RTCRtpReceiver` instance.

> `@async`
> 
> `@returns` [RTCStatsReport](https://w3c.github.io/webrtc-pc/#dom-rtcstatsreport)

#### consumer.pause()
{: #consumer-pause .code}

Pauses the consumer. Internally the library sets `track.enabled = false` in the remote track.

<div markdown="1" class="note">
This method should be called when the server side consumer has been paused (and vice-versa).
</div>

#### consumer.resume()
{: #consumer-resume .code}

Resumes the consumer Internally the library sets `track.enabled = true` in the remote track.

<div markdown="1" class="note">
This method should be called when the server side consumer has been resumed (and vice-versa).
</div>

</section>


### Events
{: #Consumer-events}

<section markdown="1">

#### consumer.on("transportclose", fn())
{: #consumer-on-transportclose .code}

Emitted when the transport this consumer belongs to is closed for whatever reason. The consumer itself is also closed.

```javascript
consumer.on("transportclose", () =>
{
  console.log("transport closed so consumer closed");
});
```

#### consumer.on("trackended", fn())
{: #consumer-on-trackended .code}

Emitted when the audio/video track being received is externally stopped.

</section>


### Observer Events
{: #Consumer-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

#### consumer.observer.on("close", fn())
{: #consumer-observer-on-close .code}

Emitted when the consumer is closed for whatever reason.

#### consumer.observer.on("pause", fn())
{: #consumer-observer-on-pause .code}

Emitted when the consumer or its associated producer is paused and, as result, the consumer becomes paused.

#### consumer.observer.on("resume", fn())
{: #consumer-observer-on-resume .code}

Emitted when the consumer or its associated producer is resumed and, as result, the consumer is no longer paused.

#### consumer.observer.on("trackended", fn())
{: #consumer-observer-on-trackended .code}

Emitted when the audio/video track being received is externally stopped.

</section>
