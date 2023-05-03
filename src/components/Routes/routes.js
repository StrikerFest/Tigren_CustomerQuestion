/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import { Route } from '@magento/peregrine';

import CustomerQuestion from '../customerQuestion';

const Routes = [
    {
        path: '/customer_question',
        exact: true,
        component: CustomerQuestion
    }
];

export default Routes;
