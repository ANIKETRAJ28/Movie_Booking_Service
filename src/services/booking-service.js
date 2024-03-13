const BookingRepository = require("../repository/booking-repository");
const axios = require("axios");
const { MOVIEPORT, USERPORT } = require("../config/server-config");
const { createChannel, publishMessage } = require("../utils/message-queue");
const { REMINDER_BINDING_KEY } = require("../config/server-config");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }
    
    async create(data) {
        try {
            console.log(data);
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
            this.sendMessageQueue(reqData);
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async sendMessageQueue(data) {
        const channel = await createChannel();
        const payload = {
            data: {
                subject: "Movie Notification",
                content: `Your movie booking for movie ${data.movie} is on date ${data.date} at ${data.time} is in the theater ${data.theater} in ${data.language} language`,
                email: data.email,
                time: data.time
            },
            service: "CREATE_TICKET"
        };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
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