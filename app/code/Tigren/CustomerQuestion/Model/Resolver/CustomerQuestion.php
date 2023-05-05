<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */
declare(strict_types=1);

namespace Tigren\CustomerQuestion\Model\Resolver;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Tigren\CustomerQuestion\Model\Question;
use Tigren\CustomerQuestion\Model\QuestionFactory;

/**
 * CMS page field resolver, used for GraphQL request processing
 */
class CustomerQuestion implements ResolverInterface
{
    /**
     * @var SearchCriteriaBuilder
     */
    private SearchCriteriaBuilder $searchCriteriaBuilder;

    /**
     * @var QuestionFactory
     */
    protected QuestionFactory $questionFactory;

    /**
     * @param QuestionFactory $questionFactory
     * @param SearchCriteriaBuilder $searchCriteriaBuilder
     * @param Question $questionModel
     */
    public function __construct(
        QuestionFactory $questionFactory,
        SearchCriteriaBuilder $searchCriteriaBuilder,
        Question $questionModel
    ) {
        $this->questionFactory = $questionFactory;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
    }


    /**
     * @param Field $field
     * @param $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return array
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ): array {
        $questionFactory = $this->questionFactory->create();
        $searchCriteria = $this->searchCriteriaBuilder
            ->setCurrentPage($args['current_page'])
            ->setPageSize($args['page_size'])
            ->create();

        $collection = $questionFactory
            ->getCollection()
            ->setPageSize($args['page_size'])
            ->setCurPage($args['current_page']);

        $totalCount = $collection->getSize();
        $items = $collection->getData();
        return [
            'items' => $items,
            'total_count' => $totalCount,
            'pageInfo' => [
                'current_page' => $searchCriteria->getCurrentPage(),
                'page_size' => $searchCriteria->getPageSize(),
                'total_pages' => ceil($totalCount / $searchCriteria->getPageSize())
            ]
        ];
    }

}
