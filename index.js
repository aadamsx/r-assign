'use strict';

/**
 * @typedef {import('r-assign').TransformSchema} TransformSchema
 */

/**
 * @template {TransformSchema} S
 * @typedef {{ [key in keyof S]: ReturnType<S[key]> }} TransformResult
 */

const { assign, create, prototype } = Object;
const { hasOwnProperty } = prototype;

const invalidSchema = 'Invalid schema argument type, object expected';

/**
 * Returns message for invalid schema property error
 * @param {string} key
 * @returns {string}
 */
const invalidSchemaProperty = (key) => {
	return `Invalid property type, "${key}" property expected to be a function`;
};

/**
 * Assign object properties and transform result based on the provided schema
 * @template {TransformSchema} S
 * @param {S} schema
 * @param {any[]} sources
 * @returns {TransformResult<S>}
 */
const rAssign = (schema, ...sources) => {

	// Check for valid schema provided
	if (!schema || typeof schema !== 'object') {
		throw TypeError(invalidSchema);
	}

	/** @type {TransformResult<S>} */
	const result = create(prototype);
	const source = assign(create(prototype), ...sources);

	// Loop through schema properties to select them
	for (const key in schema) {
		if (hasOwnProperty.call(schema, key)) {

			// Check for valid schema properties
			if (typeof schema[key] !== 'function') {
				throw TypeError(invalidSchemaProperty(key));
			}

			const value = schema[key](source[key], key, source);

			// Skip values that are undefined
			if (typeof value !== 'undefined') {
				result[key] = value;
			}
		}
	}

	return result;
};

module.exports = rAssign;