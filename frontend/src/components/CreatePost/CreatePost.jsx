import React, { useState } from 'react';
import { sendIcon, fileIcon } from '../../assets';
import { useDispatch } from 'react-redux';
import { addPost } from '../../features/postSlice';
import useFetch from '../../hooks/useFetch';
import Compress from 'compress.js';
import './createpost.css';
import { useSelector } from 'react-redux';
import { dp } from '../../assets';



const initialForm = { image: null, preview: null, caption: '' };

const CreatePost = () => {
	// local states
	const {
		user: { profileImage },
	} = useSelector(state => state);	
	const [form, setForm] = useState(initialForm);
	const [show, setShow] = useState(false);

	const dispatch = useDispatch();
	const customFetch = useFetch();
	const compress = new Compress();

	const loadImage = e => {
		const input = e.target;
		var reader = new FileReader();
		reader.onload = function (e) {
			setForm(form => ({ ...form, preview: e.target.result }));
		};
		input.files[0] && reader.readAsDataURL(input.files[0]);
		const files = [...input.files];
		compress
			.compress(files, {
				size: 1,
				quality: 0.75,
				maxWidth: 1920,
				maxHeight: 1920,
				resize: true,
				rotate: false,
			})
			.then(data => {
				setForm(form => ({
					...form,
					image: Compress.convertBase64ToFile(data[0]?.data, data[0]?.ext),
				}));
			});
	};

	const submitHandler = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', form.image);
		formData.append('caption', form.caption.trim());
		dispatch(addPost({ customFetch, formData }));
		setForm(initialForm);
	};

	return (
		<div>
			
			{show===false && <div className='createPostWrapperPlaceHolder'><article className='createpostPlaceHolder' onClick={() => setShow(true)}>
				<img
						src={profileImage || dp}
						alt='profileImage'
						className='appbar__profile__dp'
				/>
				<textarea className='textArea'
					placeholder="What's on your mind?"
				/>
				
			</article>
			</div>
			}
		{ show && <article className='createpost'>
			<form className='createPostWrapper' onSubmit={submitHandler}>
			    <img
						src={profileImage || dp}
						alt='profileImage'
						className='appbar__profile__PlaceHolder'
				/>
				<textarea
					placeholder="What's on your mind?"
					value={form.caption}
					onChange={e => setForm({ ...form, caption: e.target.value })}
				/>
				{form.preview && (
					<img src={form.preview} alt='uploaded file' className='uploaded-image' />
				)}
				<div className='btns'>
					<label htmlFor='image' aria-label='select file'>
						<div>
							<img src={fileIcon} alt='select file' />
						</div>
					</label>
					<input
						type='file'
						id='image'
						accept='image/png, image/jpeg'
						onChange={loadImage}
					/>
					<button type='submit' aria-label='submit'>
						<img src={sendIcon} alt='send' />
					</button>
				</div>
			</form>
		</article>

	}
	</div> );
};

export default CreatePost;
