<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

namespace Tigren\CustomerQuestion\Model\ResourceModel;


use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

/**
 * Class Question
 * @package Tigren\CustomerQuestion\Model\ResourceModel
 * Tigren Solutions <info@tigren.com>
 */
class Question extends AbstractDb {
    /**
     * @return void
     */
    protected function _construct(): void
    {
        $this->_init('tigren_customer_question', 'question_id');
    }
}
