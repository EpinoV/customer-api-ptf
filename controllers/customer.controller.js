import httpErrors from 'http-errors';
import { Customer, City, Seller } from '../models/index.js';

export const createCustomer = async (req, res, next) => {
  try {
    const { 
      cust_first_name,
      cust_last_name,
      cust_date_of_birth,
      cust_phone_number,
      cust_address,
      city_id,
      seller_id
    } = req.body;

    // Validar campos requeridos
    if (!cust_first_name || !cust_last_name || !city_id || !seller_id) {
      throw new httpErrors.BadRequest('Missing required fields');
    }

    // Verificar existencia de ciudad y vendedor
    const cityExists = await City.findByPk(city_id);
    const sellerExists = await Seller.findByPk(seller_id);
    
    if (!cityExists || !sellerExists) {
      throw new httpErrors.NotFound('City or Seller not found');
    }

    const newCustomer = await Customer.create({
      CUST_FIRST_NAME: cust_first_name,
      CUST_LAST_NAME: cust_last_name,
      CUST_DATE_OF_BIRTH: cust_date_of_birth,
      CUST_PHONE_NUMBER: cust_phone_number,
      CUST_ADDRESS: cust_address,
      CITY_ID: city_id,
      SELLER_ID: seller_id
    });

    res.status(201).json({
      success: true,
      data: newCustomer
    });

  } catch (error) {
    next(error);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      include: [
        { model: City, as: 'city' },
        { model: Seller, as: 'seller' }
      ]
    });
    
    res.json({
      success: true,
      data: customers
    });
  } catch (error) {
    next(new httpErrors.InternalServerError('Error retrieving customers'));
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        { model: City, as: 'city' },
        { model: Seller, as: 'seller' }
      ]
    });

    if (!customer) {
      throw new httpErrors.NotFound('Customer not found');
    }

    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    
    if (!customer) {
      throw new httpErrors.NotFound('Customer not found');
    }

    // Validar relaciones si se actualizan
    if (req.body.city_id) {
      const cityExists = await City.findByPk(req.body.city_id);
      if (!cityExists) throw new httpErrors.NotFound('City not found');
    }

    if (req.body.seller_id) {
      const sellerExists = await Seller.findByPk(req.body.seller_id);
      if (!sellerExists) throw new httpErrors.NotFound('Seller not found');
    }

    const updatedCustomer = await customer.update(req.body);
    
    res.json({
      success: true,
      data: updatedCustomer
    });

  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    
    if (!customer) {
      throw new httpErrors.NotFound('Customer not found');
    }

    await customer.destroy();
    
    res.json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    next(new httpErrors.InternalServerError('Delete failed'));
  }
};