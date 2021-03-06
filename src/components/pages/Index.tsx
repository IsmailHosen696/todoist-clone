import { FirebaseError } from 'firebase/app'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAllNotesFromFirebase } from '../../api/addnoteApi'
import { getProjectsFromFirebase, getTagFromFirebase } from '../../api/addProjectApi'
import { auth } from '../../firebase/firebase'
import { getAllNotes, getALlProject, getAllTag } from '../../redux/noteSlice'
import { setErrorString, setUser, useAppDispatch, useAppSelector } from '../../redux/noteUtilsSlice'
import ContextMenu from '../utilities/bars/ContextMenu'
import Navbar from '../utilities/bars/Navbar'
import Sidebar from '../utilities/bars/Sidebar'
import NewNotePopUp from '../utilities/noteutils/NewNotePopUp'
import RenameUtils from '../utilities/popups/RenameUtils'
import SettingMenu from '../utilities/popups/SettingMenu'
import ThemePopup from '../utilities/popups/ThemePopup'
import NewProject from '../utilities/projectutils/NewProject'
import NewTag from '../utilities/tagutils/NewTag'
import UserProfile from '../utilities/popups/UserProfile'
import EditNote from '../utilities/noteutils/EditNote'

export default function Index() {
    const { isAddNoteOpen,
        isNewTagOpen,
        isProfileSettingsOpen,
        isNewProjectOpen,
        isThemePopUpOpen,
        isSettingMenuOpen,
        isContextMenuOpen,
        position,
        isRenamePopUpOpen,
        isEditNoteOpen,
        user
    } = useAppSelector(state => state.notesutils);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    // getting users

    useEffect(() => {
        const localtheme = String(localStorage.getItem('theme'));
        if (!localtheme) {
            localStorage.setItem('theme', 'whiteTheme');
            document.documentElement.classList.remove('dark')
        } else {
            if (localtheme === 'darkTheme') {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')

            }
        }
    });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                    alert('please verify your email to continue ! check your email for further instruction')
                    navigate('/signin')
                } else {
                    dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL }))
                }
            } else {
                navigate('/signin')
            }
        })
    }, [dispatch, navigate, user.uid])
    // getting notes, project and tags
    useEffect(() => {
        getAllNotesFromFirebase(user.uid).then(data => {
            dispatch(getAllNotes(data))
        }).catch((err: FirebaseError) => {
            dispatch(setErrorString(err.message))
        })
        getProjectsFromFirebase(user.uid).then(data => {
            dispatch(getALlProject(data));
        }).catch((err) => {
            dispatch(setErrorString(err));
        })
        getTagFromFirebase(user.uid).then(data => {
            dispatch(getAllTag(data));
        }).catch((err) => {
            dispatch(setErrorString(err));
        })
    }, [dispatch, user.uid]);
    return (
        <>
            <div className="bg-viewboxWhite w-full min-h-screen dark:bg-viewboxDark overflow-x-hidden">
                <Navbar />
                <Sidebar />
                {isSettingMenuOpen && <SettingMenu />}
                {isContextMenuOpen && <ContextMenu type={position.type} id={position.id} x={position.x} y={position.y} />}
                {isAddNoteOpen && <NewNotePopUp />}
                {isNewProjectOpen && <NewProject />}
                {isNewTagOpen && <NewTag />}
                {isRenamePopUpOpen && <RenameUtils type={position.type} id={position.id} />}
                {isThemePopUpOpen && <ThemePopup />}
                {isProfileSettingsOpen && <UserProfile />}
                {isEditNoteOpen && <EditNote />}
                <div className={`mt-12 w-full h-full z-10 xl:w-6/12 lg:w-8/12 mx-auto transition-all duration-200`}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
