const router = require('express').Router();


const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const marketRoutes = require('./market-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/market', marketRoutes);
router.use('/api', apiRoutes);

module.exports = router;