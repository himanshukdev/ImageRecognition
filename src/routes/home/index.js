import { h,createRef } from 'preact';
import style from './style.css';
import { useState, } from 'preact/hooks';
import {recognizer} from "./recognition";

const Home = () => {
	
	const hiddenFileInput = createRef();
	const [state, setState] = useState({
		uploadedImage:"",
		FileExtension:""
	});

	const [isTaskDone,setIsTaskDone] = useState(null);
	const [collectedCoordinates,setCollectedCoordinates] = useState("");
	const fileUploadHandler = event => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = upload => {
      setState({
        ...state,
        uploadedImage: upload.target.result,
        FileExtension: file.name.split(".").pop()
      });
      
    };

    reader.onloadend = upload => {
			setIsTaskDone(false)
      recognizer(file).then((data)=>{
			console.log(data)
				if(data && data.length>0){
					setIsTaskDone(true)
					setCollectedCoordinates(data)
				}else{
					setCollectedCoordinates("No match found.")
					setIsTaskDone(true)
				}
		 });
    };
		if(file){
			reader.readAsDataURL(file);
		}
  };
	return (
		<div class={style.home}>
			<div class={style.formcontainer}>
				<div style={{flex:"1",display:"inline-grid",gridGap:"20px"}}>
			
					<button class={style.customuploader} onClick={()=>hiddenFileInput.current.click()}>Please Upload an image</button>
				<input
					type="file"
					ref={hiddenFileInput}
					onChange={fileUploadHandler}
					encType="multipart/form-data"
					style={{display:"none"}}
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
				
				{state.uploadedImage &&(
					<img
					src={state.uploadedImage}
					alt=""
					class={style.imageholder}
				/>
				)}
				{state.uploadedImage && (
					<>
					{isTaskDone?(
						<>
						<article style={{flex:"1",marginLeft:"148px"}}>
						{typeof collectedCoordinates === "string" ? (
								<>
								<span class={style.nomatch}>{collectedCoordinates}{"!!!"}</span>
								</>
							):(
								<table>
									<tr>
										<th>Coordinates</th>
									</tr>
									{collectedCoordinates.map((coord,idx)=>(
										<tr key={idx}>
											<td>{coord}</td>
										</tr>
									))}
								</table>
							)}
						</article>
						</>
					):(
						<>
						<div style={{flex:"1",display:"inline-grid",marginLeft:"148px"}}>
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
