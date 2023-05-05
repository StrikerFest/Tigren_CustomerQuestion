/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

module.exports = targets => {
    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push(
            {
                name: 'MyCustomerQuestion',
                pattern: '/customerquestion',
                path: require.resolve('../components/CustomerQuestion/customerQuestion.js')
            },
            {
                name: 'DefaultIndex',
                pattern: '/tigren_question',
                path: require.resolve('../components/CustomerQuestion/customerQuestion.js')
            },
            {
                name: 'Index',
                pattern: '/tigren_question/index',
                path: require.resolve('../components/CustomerQuestion/customerQuestion.js')
            },
            {
                name: 'Create',
                pattern: '/tigren_question/create',
                path: require.resolve('../components/CustomerQuestion/create.js')
            },
            {
                name: 'Edit',
                pattern: '/tigren_question/edit',
                path: require.resolve('../components/CustomerQuestion/edit.js')
            }
        );
    });
};
