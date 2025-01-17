import { React, useContext} from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { posts } from 'src/_mock/blog';
import DatabaseContext from 'src/contexts/databaseContext';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function QuestionsView() {
    const { questions } = useContext(DatabaseContext);

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">問題一覧</Typography>

                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New Post
                </Button>
            </Stack>

            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                <PostSearch posts={posts} />
                <PostSort
                    options={[
                        { value: 'latest', label: 'Latest' },
                        { value: 'popular', label: 'Popular' },
                        { value: 'oldest', label: 'Oldest' },
                    ]}
                />
            </Stack>

            <Grid container spacing={3}>
                {questions.map((question, index) => (
                    <PostCard key={question.id} post={question} index={index} />
                ))}
            </Grid>
        </Container>
    );
}
