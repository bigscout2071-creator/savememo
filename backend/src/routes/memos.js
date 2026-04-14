import express from 'express';
import { supabase } from '../server.js';

const router = express.Router();

// GET all memos
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('memos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET memo by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('memos')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE memo
router.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { data, error } = await supabase
      .from('memos')
      .insert([{ title, content, tags }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE memo
router.put('/:id', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { data, error } = await supabase
      .from('memos')
      .update({ title, content, tags, updated_at: new Date() })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE memo
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('memos')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Memo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SEARCH memos
router.get('/search/query', async (req, res) => {
  try {
    const { q } = req.query;
    const { data, error } = await supabase
      .from('memos')
      .select('*')
      .or(`title.ilike.%${q}%,content.ilike.%${q}%`);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
