<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

namespace Tigren\CustomerQuestion\Model\ResourceModel\Collection;
use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

/**
 * Class Collection
 * @package Tigren\CustomerQuestion\Model\ResourceModel\Collection
 * Tigren Solutions <info@tigren.com>
 */
class Collection extends
    AbstractCollection {
    /**
     * @return void
     */
    protected function _construct(): void
    {
        $this->_init('Tigren\CustomerQuestion\Model\Collection','Tigren\CustomerQuestion\Model\ResourceModel\Collection');
    }
}
