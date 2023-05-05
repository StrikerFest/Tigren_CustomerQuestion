<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

namespace Tigren\CustomerQuestion\Model;


use Magento\Framework\DataObject\IdentityInterface;
use Magento\Framework\Model\AbstractModel;

/**
 * Class Question
 * @package Tigren\CustomerQuestion\Model
 * Tigren Solutions <info@tigren.com>
 */
class Question extends AbstractModel implements IdentityInterface
{
    /**
     *
     */
    const CACHE_TAG = 'tigren_customer_question_question';

    /**
     * @return void
     */
    protected function _construct(): void
    {
        $this->_init('Tigren\CustomerQuestion\Model\ResourceModel\Question');
    }

    /**
     * @return string[]
     */
    public function getIdentities(): array
    {
        return [self::CACHE_TAG . '_' . $this->getId()];
    }
}
