<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */
declare(strict_types=1);

namespace Tigren\CustomerQuestion\Model\Resolver;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Setup\Exception;
use Throwable;
use Tigren\CustomerQuestion\Model\Question;
use Tigren\CustomerQuestion\Model\ResourceModel\Question as Resource;
use Tigren\CustomerQuestion\Model\QuestionFactory;
use Tigren\CustomerQuestion\Model\ResourceModel\Question\CollectionFactory;

/**
 * CMS page field resolver, used for GraphQL request processing
 */
class UpdateQuestion implements ResolverInterface
{

    private SearchCriteriaBuilder $searchCriteriaBuilder;


    protected QuestionFactory $questionFactory;
    private Resource $resource;
    private CollectionFactory $questionCollectionFactory;


    public function __construct(
        Resource $resource,
        QuestionFactory $questionFactory,
        SearchCriteriaBuilder $searchCriteriaBuilder,
        CollectionFactory $questionCollectionFactory
    ) {
        $this->resource = $resource;
        $this->questionFactory = $questionFactory;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
        $this->questionCollectionFactory = $questionCollectionFactory;
    }

    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ): array {

        $data = $args['input'];
        $id = $args['id'];
        if ($data) {
            $question = $this->questionFactory->create();
            $question->load($id);
            $data['updated_at'] = date('Y-m-d');
            $question->addData($data);
            $question->save();

            $question->getData();

            return [
                "success" => false,
                "message" => "No data passed",
            ];

        }
        return [
            "success" => false,
            "message" => "No data passed",
        ];
    }
}
