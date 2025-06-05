<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Faker\Factory;

final class BooksController extends AbstractController
{
    private function times($n, $faker)
    {
        $count = 0;
        for ($i = 0; $i < floor($n); $i++) {
            $count++;
        }
        if ($faker->randomFloat(1, 0, 1) < fmod($n, 1)) {
            $count++; 
        }
        return $count;        
    }

    private function generateReviews($seed, $language, $count) 
    {
        $reviewsFaker = Factory::create($language);
        $reviewsFaker->seed($seed);
        $reviews = [];
        $count_times = $this->times($count, $reviewsFaker);
        for ($i = 0; $i < $count_times; $i++) {
            $reviews[] = $reviewsFaker->sentence();
        }
        return $reviews;
    }

    private function generateLikes($seed, $count): int
    {
        mt_srand($seed);
        $likes = 0;
        $likes += floor($count);
        if (mt_rand() / mt_getrandmax() < fmod($count, 1)) {
            $likes++;
        }
        return $likes;
    }



    #[Route('/api/books', name: 'app_books', )]
    public function index(Request $request): JsonResponse
    {
        $seed = $request->get('seed');
        $language = $request->get('language') ?? 'en_US';
        $likes = $request->get('likes') ?? 0;
        $reviews = $request->get('reviews') ?? 0;
        $batch = $request->get('batch');

        $faker = Factory::create($language);
        $seed = $seed+$batch;
        $faker->seed($seed);

        $books = [];
        for ($i = 0; $i < 20; $i++) {
            $reviewSeed = crc32("{$seed}_book_{$i}_{$language}");
            $likesSeed = crc32("{$seed}_likes_{$i}_{$language}");
            $books[] = [
                'title' => $faker->catchPhrase(),
                'author' => $faker->name,
                'publisher' => $faker->company(),
                'isbn' => $faker->isbn13,
                'reviews' => $this->generateReviews($reviewSeed, $language, $reviews),
                'likes' => $this->generateLikes($likesSeed, $likes)
            ];
        }

        
        return new JsonResponse([
            'books' => $books,
            'seed' => $seed,
            'language' => $language
        ]);
    }
    }

