import { NextApiRequest, NextApiResponse } from 'next'
import { getAgentRawYaml } from '@/lib/agents'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  if (typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' })
  }

  const yamlContent = getAgentRawYaml(slug)

  if (!yamlContent) {
    return res.status(404).json({ error: 'Agent not found' })
  }

  res.setHeader('Content-Type', 'text/plain')
  res.status(200).send(yamlContent)
}
