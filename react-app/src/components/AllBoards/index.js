import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards} from "../../store/boards";
import { NavLink } from "react-router-dom";
import "./AllBoards.css";
import NewBoard from "../CreateBoard";
import UpdateBoard from "../UpdateBoard";
// import { colors } from "../Colors";
import OpenModalButton from "../OpenModalButton";

// import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import DeleteBoard from "../DeleteBoards";

const AllBoards = () => {
	const dispatch = useDispatch();

	const ulRef = useRef();

	const [isLoading, setIsLoading] = useState(true);
	// const [color, setColor] = useState("");
	// const [name, setName] = useState("");
	// const [errors, setErrors] = useState({});
	// const [showUpdateMenu, setShowUpdateMenu] = useState(false);
	const [targetBoard, setTargetBoard] = useState("");

	// const openUpdate = () => {
	// 	if (showUpdateMenu) return;
	// 	setShowUpdateMenu(true);
	// };

	const boards = useSelector((state) => {
		//console.log(state, "STATE");
		return state.boards.list.map((boardId) => state.boards[boardId]);
	});

	useEffect(() => {
		dispatch(getBoards()).then(() => setIsLoading(false));

		const closeOptions = async (e) => {
			if (ulRef.current) {
				if (!ulRef.current.contains(e.target)) {
					setTargetBoard(0);
					// setShowUpdateMenu(false);
					// dispatch(getBoards());
				}
			}
		};

// <<<<<<< HEAD
		document.addEventListener("click", closeOptions);

		return () => {
			document.removeEventListener("click", closeOptions);
		};
	}, [dispatch]);
// =======

// 		document.addEventListener("click", closeOptions);


// 		return () => {
// 			document.removeEventListener("click", closeOptions)

// 	};
// 	}, [dispatch, targetBoard]);
// >>>>>>> 335b1e4 (working on navbar)

	// const updateClassName =
	// 	"update__board-dropdown" + (showUpdateMenu ? " " : " hidden");

	// const boardPayLoad = {
	// 	color,
	// 	name,
	// };

	// const handleUpdate = async (e) => {
	// 	setErrors({});
	// 	e.preventDefault();

	// 	try {
	// 		dispatch(updateBoard(boardPayLoad));
	// 	} catch (data) {
	// 		setErrors(data);
	// 		alert(data.errors);
	// 	} finally {
	// 		setShowUpdateMenu(false);
	// 		setName("");
	// 		setColor("");
	// 		dispatch(getBoards());
	// 	}
	// };

	const handleMoreOptions = async (e) => {
		// setErrors({});
		setTargetBoard(e.target.className.split(" ")[2]);
		e.stopPropagation();
		e.preventDefault();
		dispatch(getBoards());
	};

	// console.log(boards, "board")
	if (isLoading)
		return <img src="https://i.imgur.com/mWjbe4Q.gif" alt="...Loading"></img>;

	if (boards.length > 0)
		return (
			<>
				{/* <div className="tabbed-nav__container">
					<div className="tabbed-nav__group">
						<NavLink
							to={`/boards`}
							className={"tabbed-nav__link"}
							id="boards-tab"
						>
							Boards
						</NavLink>

						<a className="tabbed-nav__link" id="settings-tab" href=" ">
// <<<<<<< HEAD
							
// =======
// >>>>>>> 335b1e4 (working on navbar)
							Settings
						</a>
					</div>
				</div> */}
				<div className="outer__boards__container">
					<div className="boards__container">
						<NewBoard />
						<div className="boards__group">
							{boards.toReversed().map((board) => {
								if (board)
									return (
										<>
											<div
												key={board.id}
												className={`board-${board.color} boards__board`}
												id={`board-${board.id}`}
											>
												<NavLink
													to={`/boards/${board.id}`}
													className={`board-${board.color} boards__img__navlink`}
												>
													<p className="board__name">{`${board.name}`}</p>
													<button
														className="board-options__button"
														onClick={handleMoreOptions}
													>
														<i
															className={`fa-solid fa-ellipsis ${board.id} `}
														></i>
													</button>
													<img
														src={`${board.color}`}
														alt="Board "
														className={`board-${board.color} boards__img`}
														title={`${board.name}`}
													/>
												</NavLink>
												{targetBoard == board.id ? (
// <<<<<<< HEAD
// =======

// >>>>>>> 335b1e4 (working on navbar)
													<div className={`board__options`} ref={ulRef}>
														<ul ref={ulRef}>
															<li>
																<OpenModalButton
																	className={"update__board-button"}
																	buttonText={`Update Board`}
																	modalComponent={
																		<UpdateBoard
																			id={board.id}
																			color={board.color}
																			name={board.name}
																		/>
																	}
																/>
															</li>
															<li>
																<OpenModalButton
// <<<<<<< HEAD
																	className={"delete__board-button"}
																	buttonText={"Delete Board"}
																	modalComponent={
																		<DeleteBoard
																			id={board.id}
																			name={board.name}
																		/>
																	}
																/>
															</li>
														</ul>
													</div>
// =======
														// 		className={'delete__board-button'}
														// 		buttonText={'Delete Board'}
														// 		modalComponent={<DeleteBoard id={board.id} name={board.name}/>}/>
														// 	</li>
														// </ul>

													// </div>


// >>>>>>> 335b1e4 (working on navbar)
												) : (
													<div> </div>
												)}
											</div>
										</>
									);
							})}
						</div>
					</div>
				</div>
			</>
		);
};

export default AllBoards;
