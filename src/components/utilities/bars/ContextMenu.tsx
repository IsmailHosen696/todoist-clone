import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { daleteNoteFromFirebase } from "../../../api/addnoteApi"
import { deletePtojectFromFirebase } from "../../../api/addProjectApi"
import useClick from "../../../hooks/useClick"
import CopyToClipBoard from "../../../icons/CopyToClipBoard"
import PencilIcon from "../../../icons/PencilIcon"
import TrashIcon from "../../../icons/TrashIcon"
import { deleteNote, deleteProject } from "../../../redux/noteSlice"
import { setIsContextMenuOpen, setIsRenamePopUpOpen, useAppDispatch, useAppSelector } from "../../../redux/noteUtilsSlice"

export default function ContextMenu(props: { x: number, y: number, id: string, type: string }) {
    const divRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate();
    const { isInsideClick } = useClick(divRef)

    const { notes } = useAppSelector(state => state.notes)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isInsideClick) {
            dispatch(setIsContextMenuOpen(false))
            return
        }
    }, [isInsideClick, props, dispatch])

    const handleDeleteProject = () => {
        if (props.type === 'project') {
            if (notes.filter(note => note.parentid === props.id).length > 0) {
                if (window.confirm('this action will also delete all the inside note . dou you want to delete this ?')) {
                    const prjNotes = notes.filter(note => note.parentid === props.id)
                    prjNotes.forEach(note => {
                        dispatch(deleteNote(note.id))
                        daleteNoteFromFirebase(note.id)
                    });
                    navigate('/')
                    dispatch(deleteProject(props.id));
                    deletePtojectFromFirebase(props.id);
                    dispatch(setIsContextMenuOpen(false))
                } else {
                    dispatch(setIsContextMenuOpen(false))
                    return
                }
            }
            else {
                const prjNotes = notes.filter(note => note.parentid === props.id)
                prjNotes.forEach(note => {
                    dispatch(deleteNote(note.id))
                    daleteNoteFromFirebase(note.id)
                });
                dispatch(deleteProject(props.id));
                deletePtojectFromFirebase(props.id);
                dispatch(setIsContextMenuOpen(false))
                navigate('/')
            }
        } else {
            alert('the feature will be coming soon')
        }
    }
    return (
        <div ref={divRef} style={{ position: "absolute", left: `${props.x}px`, top: `${props.y}px` }} className={`dark:bg-projHeadDark bg-navWhite w-36 px-2 z-50 py-3 rounded flex flex-col items-start dark:border-gray-700 border`}>
            <button
                className="dark:hover:bg-selectDark hover:bg-selectWhite my-1 flex items-center w-full rounded dark:text-gray-300 px-2 py-1"
                onClick={() => {
                    dispatch(setIsContextMenuOpen(false))
                    dispatch(setIsRenamePopUpOpen(true));
                }}>
                <PencilIcon />
                <span className="text-sm px-2">Rename</span>
            </button>

            <button className="dark:hover:bg-selectDark hover:bg-selectWhite my-1 flex items-center w-full rounded dark:text-gray-300 px-2 py-1"
                onClick={() => {
                    navigator.clipboard.writeText(props.id)
                    dispatch(setIsContextMenuOpen(false))
                }}>
                <CopyToClipBoard />
                <span className="text-sm px-2">Copy</span>
            </button>
            <span className="bg-gray-500 w-full" style={{ height: "1px" }}></span>
            <button
                onClick={handleDeleteProject}
                className="dark:hover:bg-selectDark hover:bg-selectWhite my-1 flex items-center w-full rounded dark:text-gray-300 px-2 py-1">
                <TrashIcon />
                <span className="text-sm px-2">Delete</span>
            </button>
        </div>
    )
}
