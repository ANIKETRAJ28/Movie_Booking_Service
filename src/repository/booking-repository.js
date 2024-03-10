const { BookingSystem } = require("../models/index");

class BookingRepository {
    
    async create(data) {
        try {
            const response = await BookingSystem.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async get(id) {
        try {
            const response = await BookingSystem.findByPk(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await BookingSystem.findAll();
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async destroy(id) {
        try {
            await BookingSystem.destroy(id);
            return true;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }
}

module.exports = BookingRepository;