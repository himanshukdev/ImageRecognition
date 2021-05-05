// Library Imports.
import { h, createRef } from "preact";
import style from "./style.css";
import { useState } from "preact/hooks";
import { Link } from 'preact-router/match';
import Icon from "preact-material-components/Icon";
import { recognizer } from "./recognition";

const Home = () => {
  // Created ref for custom file upload button.
  const hiddenFileInput = createRef();
  // Component state Management for images.
  const [state, setState] = useState({
    uploadedImage: "",
    FileExtension: "",
  });

  // Initializing flags for show/hide progess.
  // This will be toggeled as per status of recognition process.
  const [isTaskDone, setIsTaskDone] = useState(null);
  const [collectedCoordinates, setCollectedCoordinates] = useState("");

  // file upload handler.
  const fileUploadHandler = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (upload) => {
      setState({
        ...state,
        uploadedImage: upload.target.result,
        FileExtension: file.name.split(".").pop(),
      });
    };

    reader.onloadend = (upload) => {
      setIsTaskDone(false);
      // Running our image recognizer.
      recognizer(file).then((data) => {
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
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div class={style.home}>
      <div class={style.formcontainer}>
        <div style={{ flex: "1", display: "inline-grid", gridGap: "20px" }}>
          <button
            class={style.customuploader}
            onClick={() => hiddenFileInput.current.click()}
          >
            <span>
              {/* <Icon>add_photo_alternate</Icon> */}
              <span style={{ position: "relative", bottom: "4px" }}>
                Please Upload an image
              </span>
            </span>
          </button>
          <button  class={style.customuploader}><Link class={style.linkcam} href="/profile">Use Web Cam</Link></button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={fileUploadHandler}
            encType="multipart/form-data"
            style={{ display: "none" }}
          />
          <div class={style.helperarticle}>
            <ul>
              <li>Upload an image</li>
              <li>Images should have coordinates</li>
              <li>DD MM SS [N/n S/s E/e W/w] format</li>
              <li>Examples</li>
              <blockquote>
                <li>10°26'46"N 69°58'56"W</li>
                <li>40°29'46"N 79°58'59"W</li>
              </blockquote>
            </ul>
          </div>
        </div>
        {state.uploadedImage && (
          <>
            <div class={style.imagecontainer}>
              <span
                style={{ float: "right", cursor: "pointer" }}
                onClick={() => hiddenFileInput.current.click()}
              >
                <Icon>mode</Icon>
              </span>
              <img src={state.uploadedImage} alt="" class={style.imageholder} />
            </div>
          </>
        )}
        {state.uploadedImage && (
          <>
            {isTaskDone ? (
              <>
                <article style={{ flex: "1", marginLeft: "148px" }}>
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
                <div
                  style={{
                    flex: "1",
                    display: "inline-grid",
                    marginLeft: "148px",
                  }}
                >
                  <p>Task in progress</p>
                  <div class={style.loader} />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
