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

/**
 * CMS page field resolver, used for GraphQL request processing
 */
class CreateQuestion implements ResolverInterface
{

    private SearchCriteriaBuilder $searchCriteriaBuilder;


    protected QuestionFactory $questionFactory;
    private Resource $resource;


    public function __construct(
        Resource $resource,
        QuestionFactory $questionFactory,
        SearchCriteriaBuilder $searchCriteriaBuilder,
    ) {
        $this->resource = $resource;
        $this->questionFactory = $questionFactory;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
    }
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ): array {

        $data = $args['input'];
        if ($data) {
            $model = $this->questionFactory->create();
            $data['created_at'] = date('Y-m-d');
            $data['updated_at'] = date('Y-m-d');
            $model->setData($data);
            try {
                $this->resource->save($model);
                return [
                    "success" => true,
                    "message" => "Question created successfully!",
                ];
            } catch (LocalizedException $exception) {
                return [
                    "success" => false,
                    "message" => $exception,
                ];
            }
        }
        return [
            "success" => false,
            "message" => "No data passed",
        ];
    }
}
