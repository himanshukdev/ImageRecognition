import { h, createRef } from "preact";
import Webcam from "webcam-easy";
import { useEffect, useState } from "preact/hooks";
import style from "./style.css";
import {recognizer} from "../home/recognition";

const Profile = () => {
  let thisWebcam;
	const [isTaskDone, setIsTaskDone] = useState(null);
  const [collectedCoordinates, setCollectedCoordinates] = useState("");

	useEffect(()=>{
		webcameraStart();
	},[])

	useEffect(()=>{
		webcameraStart();
	},[isTaskDone])

  const webcameraStart = () => {
    const webcamElement = document.getElementById("webcam");
    const canvasElement = document.getElementById("canvas");
    const webcam = new Webcam(webcamElement, "user", canvasElement);
    thisWebcam = webcam;
    webcam
      .start()
      .then((result) => {
        console.log("webcam started");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const snapPicture = () => {
		thisWebcam.snap();
    const picture = thisWebcam.snap();
    console.log(picture);
		setIsTaskDone(false);
      // Running our image recognizer.
      recognizer(picture).then((data) => {
        console.log(data);

        if (data && data.length > 0 && data[0] !== null) {
          setIsTaskDone(true);
          // setting task results in component state.
          setCollectedCoordinates(data);
        } else {
          // setting task results in component state.
          setCollectedCoordinates("No match found.");
          setIsTaskDone(true);
        }
      });
  };

  return (
    <>
      <div class={style.profile}>
        <div style={{display:"inline-flex",flexDirection:"row",marginTop:"40px"}}>
          <div style={{display:"inline-flex",flexDirection:"row"}}>
            <div style={{display:"inline-grid"}}>
              <video
                id="webcam"
                autoplay
                playsinline
                width="425"
                height="400"
								class={style.camcontainer}
              />
							<div style={{textAlign:"center"}}>
								<button class={style.actionbutton} onClick={snapPicture}> Grab The coordinates</button>
							</div>
            </div>
            <div style={{height:"300px",width:"200px"}}>
              <canvas id="canvas" class={style.canvasimage} />
            </div>
          </div>
					{isTaskDone ? (
              <>
                <article style={{ flex: "1", marginLeft: "417px" }}>
									{console.log(collectedCoordinates)}
                  {typeof collectedCoordinates === "string" || collectedCoordinates.length == 0 ? (
                    <>
                      <span class={style.nomatch}>
                        {collectedCoordinates}
                        {"!!!"}
                      </span>
                    </>
                  ) : (
                    <table>
                      <tr>
                        <th>Coordinates</th>
                      </tr>
                      {collectedCoordinates.map((coord, idx) => (
                        <tr key={idx}>
                          <td>{coord}</td>
                        </tr>
                      ))}
                    </table>
                  )}
                </article>
              </>
            ) : (
              <>
							{isTaskDone !== null && (
								<div
                  style={{
                    flex: "1",
                    display: "inline-grid",
                    marginLeft: "417px",
                  }}
                >
                  <p>Task in progress</p>
                  <div class={style.loader} />
                </div>
							)} 
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default Profile;
