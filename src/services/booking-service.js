const BookingRepository = require("../repository/booking-repository");
const axios = require("axios");
const { MOVIEPORT, USERPORT } = require("../config/server-config");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }
    
    async create(data) {
        try {
            const movieData = await axios.get(`http://localhost:${MOVIEPORT}/api/v1/movies/${data.movieId}`);
            const userData = await axios.get(`http://localhost:${USERPORT}/api/v1/users/${data.userId}`);
            const name =  userData.data.data.name;
            const email =  userData.data.data.email;
            const phone =  userData.data.data.phone;
            const movie = movieData.data.data.name;
            const theater = movieData.data.data.theater[0].name;
            const language = movieData.data.data.language[0].name;
            const date = data.date;
            const time = data.time;
            const reqData = {
                name,
                email,
                phone,
                movie,
                theater,
                language,
                date,
                time
            }
            const response = await this.bookingRepository.create(reqData);
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async get(id) {
        try {
            const response = await this.bookingRepository.get(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.bookingRepository.getAll();
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async destroy(id) {
        try {
            await this.bookingRepository.destroy(id);
            return true;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}

module.exports = BookingService;