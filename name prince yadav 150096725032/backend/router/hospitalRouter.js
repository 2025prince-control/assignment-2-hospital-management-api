const express = require('express');
const Hospital = require('../models/Hospital');

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const hospitals = await Hospital.find();

        response.status(200).json(hospitals);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const hospital = await Hospital.findById(request.params.id);

        if (!hospital) {
            return response.status(404).json({
                message: 'Hospital not found'
            });
        }

        response.status(200).json(hospital);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

router.post('/', async (request, response) => {
    try {
        const { name, city, totalBeds, availableBeds } = request.body;

        if (!name) {
            return response.status(400).json({
                message: 'Name field is required'
            });
        }

        if (!city) {
            return response.status(400).json({
                message: 'City field is required'
            });
        }

        if (totalBeds === undefined || totalBeds === null || totalBeds === '') {
            return response.status(400).json({
                message: 'Total beds field is required'
            });
        }

        if (availableBeds === undefined || availableBeds === null || availableBeds === '') {
            return response.status(400).json({
                message: 'Available beds field is required'
            });
        }

        const hospitalData = {
            name,
            city,
            totalBeds: Number(totalBeds),
            availableBeds: Number(availableBeds)
        };

        const hospital = await Hospital.create(hospitalData);

        response.status(201).json({
            message: 'Hospital created successfully',
            createdHospital: hospital
        });
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const { name, city, totalBeds, availableBeds } = request.body;

        if (!name) {
            return response.status(400).json({
                message: 'Name field is required'
            });
        }

        if (!city) {
            return response.status(400).json({
                message: 'City field is required'
            });
        }

        if (totalBeds === undefined || totalBeds === null || totalBeds === '') {
            return response.status(400).json({
                message: 'Total beds field is required'
            });
        }

        if (availableBeds === undefined || availableBeds === null || availableBeds === '') {
            return response.status(400).json({
                message: 'Available beds field is required'
            });
        }

        const hospitalData = {
            name,
            city,
            totalBeds: Number(totalBeds),
            availableBeds: Number(availableBeds)
        };

        const hospital = await Hospital.findByIdAndUpdate(
            request.params.id,
            hospitalData,
            { new: true }
        );

        if (!hospital) {
            return response.status(404).json({
                message: 'Hospital not found'
            });
        }

        response.status(200).json({
            message: 'Hospital updated successfully',
            updatedHospital: hospital
        });
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(request.params.id);

        if (!hospital) {
            return response.status(404).json({
                message: 'Hospital not found'
            });
        }

        response.status(200).json({
            message: 'Hospital deleted successfully',
            deletedHospital: hospital
        });
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;