const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'DISC Assessment API',
    version: '1.0.0',
    description: 'Comprehensive API documentation for the DISC Assessment Platform backend services.',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: 'http://localhost:10000',
      description: 'Local Development Server',
    },
    {
      url: '/',
      description: 'Current Host Server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token obtained from `/auth/verify-otp` (without "Bearer " prefix).',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '662b1b369c72e2d9a3f12345' },
          employeeId: { type: 'string', example: 'EMP047' },
          phone: { type: 'string', example: '9894511482' },
          name: { type: 'string', example: 'Sudhir' },
          email: { type: 'string', example: '4sudhirv@gmail.com' },
          gender: { type: 'string', example: 'Male' },
          isAdmin: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      QuestionOption: {
        type: 'object',
        properties: {
          text: { type: 'string', example: 'Competitive and goal-oriented' },
          type: { type: 'string', enum: ['D', 'I', 'S', 'C'], example: 'D' },
        },
      },
      QuestionItem: {
        type: 'object',
        properties: {
          qId: { type: 'integer', example: 1 },
          question: { type: 'string', example: 'In a team environment, you are most likely to:' },
          options: {
            type: 'array',
            items: { $ref: '#/components/schemas/QuestionOption' },
          },
        },
      },
      QuestionSet: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '662b1b369c72e2d9a3f67890' },
          setId: { type: 'integer', example: 1 },
          questions: {
            type: 'array',
            items: { $ref: '#/components/schemas/QuestionItem' },
          },
        },
      },
      AssessmentAnswer: {
        type: 'object',
        required: ['qId', 'most', 'least'],
        properties: {
          qId: { type: 'integer', example: 1 },
          most: { type: 'string', enum: ['D', 'I', 'S', 'C'], example: 'D' },
          least: { type: 'string', enum: ['D', 'I', 'S', 'C'], example: 'S' },
        },
      },
      Assessment: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '662b1b369c72e2d9a3f11223' },
          userId: { type: 'string', example: '662b1b369c72e2d9a3f12345' },
          setId: { type: 'integer', example: 1 },
          answers: {
            type: 'array',
            items: { $ref: '#/components/schemas/AssessmentAnswer' },
          },
          score: {
            type: 'object',
            properties: {
              D: { type: 'number', example: 12 },
              I: { type: 'number', example: 8 },
              S: { type: 'number', example: -4 },
              C: { type: 'number', example: 2 },
            },
          },
          percentages: {
            type: 'object',
            properties: {
              D: { type: 'number', example: 65 },
              I: { type: 'number', example: 60 },
              S: { type: 'number', example: 45 },
              C: { type: 'number', example: 52 },
            },
          },
          highestTrait: { type: 'string', example: 'D' },
          secondaryTrait: { type: 'string', example: 'I' },
          timeTaken: { type: 'number', description: 'Time taken in seconds', example: 420 },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Error description' },
          error: { type: 'string', example: 'Detailed error info' },
        },
      },
    },
  },
  paths: {
    '/': {
      get: {
        summary: 'Root Health Check',
        description: 'Returns health status of the API.',
        responses: {
          200: {
            description: 'API is healthy and running',
            content: {
              'text/plain': {
                schema: { type: 'string', example: 'DISC Assessment API is running...' },
              },
            },
          },
        },
      },
    },
    '/auth/send-otp': {
      post: {
        tags: ['Authentication'],
        summary: 'Send OTP to registered phone number',
        description: 'Sends an SMS OTP to a registered user phone number via Msg91.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['phone'],
                properties: {
                  phone: { type: 'string', example: '9894511482', description: 'User mobile number without +91' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OTP sent successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'OTP sent successfully' },
                    details: { type: 'object' },
                  },
                },
              },
            },
          },
          400: { description: 'Missing phone number or failed to send OTP', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          404: { description: 'User not registered in database', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/auth/verify-otp': {
      post: {
        tags: ['Authentication'],
        summary: 'Verify OTP and obtain JWT authentication token',
        description: 'Validates the submitted OTP. Upon success, returns user profile and 30-day JWT bearer token.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['phone', 'otp'],
                properties: {
                  phone: { type: 'string', example: '9894511482' },
                  otp: { type: 'string', example: '1234' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Login successful' },
                    user: { $ref: '#/components/schemas/User' },
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                  },
                },
              },
            },
          },
          400: { description: 'Invalid OTP or missing fields', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          401: { description: 'Verification failed', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          404: { description: 'User record not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/auth/retry-otp': {
      post: {
        tags: ['Authentication'],
        summary: 'Resend OTP to phone number',
        description: 'Triggers OTP retry via voice or SMS.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['phone'],
                properties: {
                  phone: { type: 'string', example: '9894511482' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OTP resent successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'OTP resent successfully' },
                    details: { type: 'object' },
                  },
                },
              },
            },
          },
          400: { description: 'Failed to resend OTP', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/user/profile/{userId}': {
      get: {
        tags: ['User'],
        summary: 'Get user profile',
        description: 'Retrieves user profile details. Accessible by the user themselves or by an Admin.',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            description: 'MongoDB User ID',
            schema: { type: 'string' },
            example: '662b1b369c72e2d9a3f12345',
          },
        ],
        responses: {
          200: {
            description: 'User profile retrieved successfully',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/User' } },
            },
          },
          401: { description: 'Unauthorized - invalid or missing JWT token' },
          403: { description: 'Forbidden - not authorized to view this profile' },
          404: { description: 'User not found' },
        },
      },
    },
    '/assessment/start/{userId}': {
      get: {
        tags: ['Assessment'],
        summary: 'Start an assessment (Fetch random question set)',
        description: 'Clears any previous incomplete attempts and serves a randomized question set.',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            example: '662b1b369c72e2d9a3f12345',
          },
        ],
        responses: {
          200: {
            description: 'Random question set retrieved',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/QuestionSet' } },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No questions found in database' },
        },
      },
    },
    '/assessment/submit/{userId}': {
      post: {
        tags: ['Assessment'],
        summary: 'Submit completed assessment',
        description: 'Calculates raw DISC scores, percentage conversions, highest/secondary traits, and saves completed assessment.',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            example: '662b1b369c72e2d9a3f12345',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['setId', 'answers'],
                properties: {
                  setId: { type: 'integer', example: 1 },
                  timeTaken: { type: 'number', example: 380, description: 'Duration in seconds' },
                  answers: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/AssessmentAnswer' },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Assessment evaluated and saved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Assessment submitted successfully' },
                    assessment: { $ref: '#/components/schemas/Assessment' },
                  },
                },
              },
            },
          },
          400: { description: 'Missing required submission fields' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/assessment/save-progress/{userId}': {
      post: {
        tags: ['Assessment'],
        summary: 'Auto-save in-progress assessment',
        description: 'Saves current answering progress so user can resume anytime.',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            example: '662b1b369c72e2d9a3f12345',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['setId', 'answers'],
                properties: {
                  setId: { type: 'integer', example: 1 },
                  answers: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/AssessmentAnswer' },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Progress saved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Progress saved' },
                    assessment: { $ref: '#/components/schemas/Assessment' },
                  },
                },
              },
            },
          },
          400: { description: 'Invalid data' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/assessment/progress/{userId}/{setId}': {
      get: {
        tags: ['Assessment'],
        summary: 'Get saved in-progress assessment answers',
        description: 'Retrieves incomplete assessment draft answers for resuming.',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            example: '662b1b369c72e2d9a3f12345',
          },
          {
            name: 'setId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            example: 1,
          },
        ],
        responses: {
          200: {
            description: 'Saved progress found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Assessment' } },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No saved progress found' },
        },
      },
    },
    '/assessment/result/{userId}': {
      get: {
        tags: ['Assessment'],
        summary: 'Get latest completed assessment result',
        description: 'Retrieves calculated scores, percentages, and trait profiles.',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            example: '662b1b369c72e2d9a3f12345',
          },
        ],
        responses: {
          200: {
            description: 'Assessment result retrieved',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Assessment' } },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Not authorized to view this report' },
          404: { description: 'Assessment not found' },
        },
      },
    },
    '/assessment/status/{userId}': {
      get: {
        tags: ['Assessment'],
        summary: 'Check if user has completed assessment',
        description: 'Returns boolean flag indicating whether the user already finished an assessment.',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            example: '662b1b369c72e2d9a3f12345',
          },
        ],
        responses: {
          200: {
            description: 'Status checked',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    hasCompleted: { type: 'boolean', example: true },
                    assessmentId: { type: 'string', nullable: true, example: '662b1b369c72e2d9a3f11223' },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/admin/users/report': {
      get: {
        tags: ['Admin'],
        summary: 'Get report of all users and assessment results',
        description: 'Returns consolidated list of users with their assessment completion status and DISC scores. Admin only.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Report data retrieved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    count: { type: 'integer', example: 10 },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          _id: { type: 'string' },
                          employeeId: { type: 'string', example: 'EMP047' },
                          name: { type: 'string', example: 'Sudhir' },
                          email: { type: 'string', example: '4sudhirv@gmail.com' },
                          phone: { type: 'string', example: '9894511482' },
                          gender: { type: 'string', example: 'Male' },
                          isAdmin: { type: 'boolean', example: true },
                          assessmentCompleted: { type: 'boolean', example: true },
                          discScores: { type: 'object' },
                          percentages: { type: 'object' },
                          highestTrait: { type: 'string', example: 'D' },
                          secondaryTrait: { type: 'string', example: 'I' },
                          timeTaken: { type: 'number', example: 340 },
                          completedAt: { type: 'string', format: 'date-time' },
                          createdAt: { type: 'string', format: 'date-time' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden - Admin access required' },
        },
      },
    },
    '/admin/users/export/xlsx': {
      get: {
        tags: ['Admin'],
        summary: 'Export user assessment reports to Excel (.xlsx)',
        description: 'Downloads an Excel workbook containing all user assessment data. Admin only.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Excel spreadsheet binary stream',
            content: {
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
                schema: { type: 'string', format: 'binary' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden - Admin access required' },
        },
      },
    },
    '/admin/users/export/pdf': {
      get: {
        tags: ['Admin'],
        summary: 'Export user assessment reports to PDF',
        description: 'Downloads a generated PDF report of all users and traits. Admin only.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'PDF report binary stream',
            content: {
              'application/pdf': {
                schema: { type: 'string', format: 'binary' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden - Admin access required' },
        },
      },
    },
    '/admin/settings/toggle-results': {
      post: {
        tags: ['Admin'],
        summary: 'Toggle instant result visibility for users',
        description: 'Allows Admin to control whether users can view their DISC score results immediately after submission. Admin only.',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['enabled'],
                properties: {
                  enabled: { type: 'boolean', example: true },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Setting updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    enabled: { type: 'boolean', example: true },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden - Admin access required' },
        },
      },
    },
    '/admin/settings/results-status': {
      get: {
        tags: ['Admin'],
        summary: 'Get results visibility setting',
        description: 'Checks whether assessment result display is currently enabled.',
        responses: {
          200: {
            description: 'Current result visibility flag',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    enabled: { type: 'boolean', example: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const swaggerUiOptions = {
  customSiteTitle: 'DISC Assessment API Documentation',
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    persistAuthorization: true,
  },
};

module.exports = {
  swaggerUi,
  swaggerDocument,
  swaggerUiOptions,
};
