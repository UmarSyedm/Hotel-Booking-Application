import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:8080",
});

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

// This func add a new room to the db
export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData();
	formData.append("photo", photo);
	formData.append("roomType", roomType);
	formData.append("roomPrice", roomPrice);

	const response = await api.post("/rooms/add/new-room", formData);
	// const response = await api.post("/rooms/add/new-room", formData, {
	// 	headers: getHeader(),
	// });
	if (response.status == 201) {
		return true
	} else {
		return false
	}
}

// This func gets all room types from the db
export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/room/types");
		return response.data;
	} catch (error) {
		throw new Error("Error fetching room types");
	}
}

// export async function getRoomTypes() {
//     try {
//         const response = await api.get("/rooms/all-rooms");
//         return response.data;
//     } catch (error) {
//         throw new Error("Error fetching rooms");
//     }
// }

export async function getAllRooms() {
	try {
		const result = await api.get("/rooms/all-rooms")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}

/* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`,
			// {
			//     headers: getHeader()
			// }
		)
		return result.data
	} catch (error) {
		throw new Error(`Error Deleting Room ${error.message}`)
	}
}

/* This function updates a room */
export async function updateRoom(roomId, roomData) {
	const formData = new FormData()
	formData.append("roomType", roomData.roomType)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)

	// const response = await api.put(`/rooms/update/${roomId}`, formData,{
	// 	headers: getHeader()
	// })

	const response = await api.put(`/rooms/update/${roomId}`, formData)
	return response
}

/* This funcction gets a room by the id */
export async function getRoomById(roomId) {
	try {
		const result = await api.get(`/rooms/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

/* This function saves a new booking to the databse */
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}
}

/* This function gets alll bokings from the database */
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings")
		// {
		// 	headers: getHeader()
		// })
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error Finding Booking: ${error.message}`)
		}
	}
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error Cancelling Booking: ${error.message}`)
	}
}

/* This function gets all available rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}

/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User Registration Error: ${error.message}`)
		}
	}
}

/* This function logs in a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is the function to get the user profile */
// eslint-disable-next-line no-unused-vars
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw new Error(`User Profile Loading Error: ${error.message}`)
	}
}

/* This is the function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
// eslint-disable-next-line no-unused-vars
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get user bookings by the user id */
// eslint-disable-next-line no-unused-vars
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error Fetching Bookings:", error.message)
		throw new Error("Failed to Fetch Bookings!")
	}
}
