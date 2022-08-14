import React from 'react';
import { Link } from 'react-router-dom';
import { dp, chatIcon, videoChatIcon } from '../../assets';
import './leftmenu.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/modalSlice';


const LeftMenu = () => {
	const dispatch = useDispatch();
    const {
		user: { id, profileImage },
	} = useSelector(state => state);

	return (
		<section className='sidebarMenu'>
             <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className='sidebarMenuList' onClick={() => {
							dispatch(toggleSidebar(false));
						}}>
            <li className="sidebarListItem">
			<Link className='sidebarListItem1' to={`/user/${id}`}>
					<img
						src={profileImage || dp}
						alt='profileImage'
						className='appbar__profile__dp'
						title='profile'
					/>
					Profile
			</Link>
            
            </li>
            <li className="sidebarListItem">
            <Link className='sidebarListItem2' to='/chat'>
					<img src={chatIcon} alt='chat' className='chat' />
					Chat
			</Link>
            </li>
			<li className="sidebarListItem">
			<div className="sidebarListItem1" onClick={() => {
      window.open("https://ca54pepasgtsd02mv770-93iakud7j-gadisadawit22-gmailcom.vercel.app/create", "_blank");
    }} >
			<img src={videoChatIcon} alt='chat' className='videochat' />
					Video Chat
			</div>
            </li>
            </ul>
		</section>
	);
};

export default LeftMenu;
